import React from 'react'

import { defineDisplayName } from '~/Data'

type Props = JSX.IntrinsicElements['div']

export function component(props: Props) {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 })

    function handleResize() {
        containerRef.current && setDimensions(containerRef.current.getBoundingClientRect())
    }

    React.useEffect(() => {
        handleResize()

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div {...props} className="Container" ref={containerRef}>
            <div>
                {dimensions.width} x {dimensions.height}
            </div>
        </div>
    )
}

defineDisplayName('Component.Image.Placeholder', { component })
