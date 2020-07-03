import React from 'react'
import cc from 'classcat'

type Props = JSX.IntrinsicElements['figcaption']

export function figcaption({ className, ...props }: Props) {
  return (
    <figcaption {...props} className={cc(['c-mdx-figcaption', className])} />
  )
}
