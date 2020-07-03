import React from 'react'
import cc from 'classcat'

import { Props, component } from '../Paragraph'

export function p({ className, ...props }: Props) {
  return component({ ...props, className: cc(['c-mdx-paragraph', className]) })
}
