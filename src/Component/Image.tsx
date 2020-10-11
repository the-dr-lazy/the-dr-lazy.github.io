import React from 'react'
import cc from 'classcat'
import GatsbyImage, { FixedObject, FluidObject, GatsbyImageProps } from 'gatsby-image'

import { VDOM, defineDisplayName } from '~/Data'

export * from './Image/index'

type Props =
    | ({
          src: FluidObject | FixedObject
      } & Omit<GatsbyImageProps, 'fluid' | 'fixed' | 'src'>)
    | ({ src: string } & Omit<JSX.IntrinsicElements['img'], 'src'>)

function isFixedObject(value: FixedObject | FluidObject): value is FixedObject {
    return 'width' in value && 'heigth' in value
}

const classNames = {
    modifiers: {
        shape: {
            round: '-shape-round',
        },
    },
}

export function component(props: Props): VDOM {
    if (typeof props.src === 'string') {
        return <img {...(props as JSX.IntrinsicElements['img'])} />
    }

    const { src, ...rest } = props
    const srcKey = isFixedObject(props.src) ? 'fixed' : 'fluid'

    const derivedProps = {
        ...rest,
        [srcKey]: src,
    }

    // const Component = src.tracedSVG ? GatsbyImage : StyledGatsbyImag
    return <GatsbyImage {...(derivedProps as GatsbyImageProps)} />
}

type RoundProps = Props

export function round({ className, ...props }: RoundProps) {
    return component({
        ...props,
        className: cc([className, classNames.modifiers.shape.round]),
    })
}

defineDisplayName('Component.Image', { component, round })
