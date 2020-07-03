import React from 'react'
import cc from 'classcat'
import * as THREE from 'three'

const canvassize = 200
const length = 30
const radius = 5.6
const pi2 = Math.PI * 2

function mkMesh({ foreground }: Props) {
  return () =>
    new THREE.Mesh(
      new THREE.TubeGeometry(
        new (THREE.Curve.create(
          function () {},
          function (percent: number) {
            var x = length * Math.sin(pi2 * percent),
              y = radius * Math.cos(pi2 * 3 * percent),
              z,
              t

            t = (percent % 0.25) / 0.25
            t = (percent % 0.25) - (2 * (1 - t) * t * -0.0185 + t * t * 0.25)
            if (
              Math.floor(percent / 0.25) == 0 ||
              Math.floor(percent / 0.25) == 2
            ) {
              t *= -1
            }
            z = radius * Math.sin(pi2 * 2 * (percent - t))

            return new THREE.Vector3(x, y, z)
          },
        ))(),
        200,
        1.1,
        2,
        true,
      ),
      new THREE.MeshBasicMaterial({
        color: foreground,
      }),
    )
}

function mkRingcover({ background }: Props) {
  return () => {
    const ringcover = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 15, 1),
      new THREE.MeshBasicMaterial({
        color: background,
        opacity: 0,
        transparent: true,
      }),
    )
    ringcover.position.x = length + 1
    ringcover.rotation.y = Math.PI / 2

    return ringcover
  }
}

function mkRing({ foreground }: Props) {
  return () => {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(4.3, 5.55, 32),
      new THREE.MeshBasicMaterial({
        color: foreground,
        opacity: 0,
        transparent: true,
      }),
    )
    ring.position.x = length + 1.1
    ring.rotation.y = Math.PI / 2

    return ring
  }
}

function mkPlain({ background }: Props) {
  return (_: unknown, ix: number) => {
    const plain = new THREE.Mesh(
      new THREE.PlaneGeometry(length * 2 + 1, radius * 3, 1),
      new THREE.MeshBasicMaterial({
        color: background,
        transparent: true,
        opacity: 0.13,
      }),
    )
    plain.position.z = -2.5 + ix * 0.5

    return plain
  }
}

function mkPlains(props: Props) {
  return () => Array.from({ length: 10 }).fill(undefined).map(mkPlain(props))
}

function mkRenderer({ background }: Props) {
  return () => {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(canvassize, canvassize)
    renderer.setClearColor(background)

    return renderer
  }
}

function easing(t: number, b: number, c: number, d: number) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t + b
  return (c / 2) * ((t -= 2) * t * t + 2) + b
}

function mkCamera() {
  const camera = new THREE.PerspectiveCamera(65, 1, 1, 10000)
  camera.position.z = 75
  return camera
}

function mkScene() {
  const scene = new THREE.Scene()
  // scene.add(new THREE.AxisHelper(30));

  return scene
}

type Props = {
  background: number
  foreground: number
  animate: boolean
  className?: string
}

/**
 * Port of https://codepen.io/psyonline/pen/yayYWg
 */
export function component(props: Props) {
  const rotatevalue = React.useRef(0.035)
  const acceleration = React.useRef(0)
  const animatestep = React.useRef(0)
  const toend = React.useRef(false)

  const animationFrameId = React.useRef<number>()
  const block = React.useRef<HTMLDivElement>(null)
  const canvas = React.useRef<HTMLCanvasElement>()

  const dependencies = [props.background, props.foreground]

  const camera = React.useMemo(mkCamera, [])
  const scene = React.useMemo(mkScene, dependencies)

  const group = React.useMemo(() => new THREE.Group(), dependencies)
  const mesh = React.useMemo(mkMesh(props), dependencies)
  const ringcover = React.useMemo(mkRingcover(props), dependencies)
  const ring = React.useMemo(mkRing(props), dependencies)
  const plains = React.useMemo(mkPlains(props), dependencies)
  const renderer = React.useMemo(mkRenderer(props), dependencies)

  function render() {
    var progress

    animatestep.current = Math.max(
      0,
      Math.min(
        240,
        toend.current ? animatestep.current + 1 : animatestep.current - 4,
      ),
    )
    acceleration.current = easing(animatestep.current, 0, 1, 240)

    if (acceleration.current > 0.35) {
      progress = (acceleration.current - 0.35) / 0.65
      group.rotation.y = (-Math.PI / 2) * progress
      group.position.z = 50 * progress
      progress = Math.max(0, (acceleration.current - 0.97) / 0.03)
      mesh.material.opacity = 1 - progress
      ringcover.material.opacity = ring.material.opacity = progress
      ring.scale.x = ring.scale.y = 0.9 + 0.1 * progress
    }

    renderer.render(scene, camera)
  }

  function animate() {
    mesh.rotation.x += rotatevalue.current + acceleration.current

    render()

    if (props.animate) {
      animationFrameId.current = requestAnimationFrame(animate)
    }
  }

  React.useEffect(() => {
    group.add(mesh, ringcover, ring, ...plains)
    scene.add(group)

    canvas.current = block.current!.appendChild(renderer.domElement)

    props.animate && animate()

    return () => {
      cancelAnimationFrame(animationFrameId.current!)
      block.current!.removeChild(canvas.current!)
    }
  }, [props.animate, ...dependencies])

  const blockClassName = cc([
    'c-loader',
    props.animate && '-animate',
    props.className,
  ])

  return <div className={blockClassName} ref={block} />
}
component.defaultProps = {
  background: 0xfafafa,
  foreground: 0x6166dc,
  animate: true,
}
