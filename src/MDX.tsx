import React from 'react'
import { Components, MDXProvider } from '@mdx-js/react'
import YouTube from 'react-youtube'

import { MDX } from '~/Component'
import { VDOM } from '~/Data'

const components: Components = {
    ...MDX.Heading,
    ...MDX.Paragraph,
    ...MDX.Anchor,
    ...MDX.Blockquote,
    ...MDX.HorizontalRule,
    ...MDX.Figcaption,
    ...MDX.List,
    ...MDX.Table,
    ...MDX.Image,
    ...MDX.Code,
    LTR: MDX.LTR.component,
    YouTube: MDX.YouTube.component,
}

export function provider(props: React.PropsWithChildren<{}>): VDOM {
    return <MDXProvider {...props} components={components} />
}
