import React from 'react'
import cc from 'classcat'

type Props = JSX.IntrinsicElements['a']

export function a({ className, ...props }: Props) {
    return <a {...props} className={cc(['c-mdx-anchor', className])}></a>
}
