import React from 'react'
import { MDXRenderer, MDXRendererProps } from 'gatsby-plugin-mdx'

import { isDark, Theme, VDOM } from '~/Data'

export * from './MDX/index'

export type Props = { theme: Theme; children: string }

export function component({ theme, ...props }: Props): VDOM {
    return (
        <div className="c-mdx">
            <MDXRenderer isDark={isDark(theme)} {...props} />
        </div>
    )
}
