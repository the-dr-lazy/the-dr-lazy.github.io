import React from 'react'
import cc from 'classcat'

type Props = JSX.IntrinsicElements['hr']

export function hr({ className, ...props }: Props) {
    return <hr {...props} className={cc(['c-mdx-horizontal-rule', className])} />
}
