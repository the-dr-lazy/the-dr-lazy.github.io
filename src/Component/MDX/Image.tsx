import React from 'react'
import { useSelector } from 'react-redux'
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'

import * as Store from '~/Store'
import { VDOM, isDark } from '~/Data'

type ImgProps = JSX.IntrinsicElements['img']

export function img(props: ImgProps): VDOM {
    const theme = useSelector(Store.getTheme)
    const [isZoomed, setIsZoomed] = React.useState(false)

    const image = {
        ...props,
        className: 'c-mdx-image',
        style: {
            display: 'block',
            margin: '0 auto',
            width: '100%',
            borderRadius: isZoomed ? '5px' : '0px',
        },
    }

    const handleZoomChange = React.useCallback(shouldZoom => setIsZoomed(shouldZoom), [])

    return (
        <ControlledZoom
            isZoomed={isZoomed}
            onZoomChange={handleZoomChange}
            zoomMargin={40}
            overlayBgColorEnd={isDark(theme) ? '#111216' : '#fafafa'}
        >
            <img className={image.className} src={image.src} alt={image.alt} style={image.style} />
        </ControlledZoom>
    )
}
