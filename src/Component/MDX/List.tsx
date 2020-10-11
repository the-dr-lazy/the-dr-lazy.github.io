import React from 'react'
import cc from 'classcat'

type OrderedProps = JSX.IntrinsicElements['ol']

export function ol({ className, ...props }: OrderedProps): VDOM {
    return <ol {...props} className={cc(['c-mdx-ordered-list', className])} />
}

type UnorderedProps = JSX.IntrinsicElements['ul']

export function ul({ className, ...props }: UnorderedProps): VDOM {
    return <ul {...props} className={cc(['c-mdx-unordered-list', className])} />
}
