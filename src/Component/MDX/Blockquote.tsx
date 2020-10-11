import React from 'react'
import cc from 'classcat'

type Props = JSX.IntrinsicElements['blockquote']

export function blockquote({ className, ...props }: Props) {
    return <blockquote {...props} className={cc(['c-mdx-blockquote', className])} />
}
