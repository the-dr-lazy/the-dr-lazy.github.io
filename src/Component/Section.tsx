import React from 'react'
import cc from 'classcat'

import { VDOM, defineDisplayName } from '~/Data'

type Props = React.PropsWithChildren<
  { narrow?: boolean } & JSX.IntrinsicElements['section']
>

const classNames = {
  block: 'c-section',
  modifiers: {
    narrow: '-narrow',
  },
}

export function component({ children, narrow }: Props): VDOM {
  const className = cc([
    classNames.block,
    narrow && classNames.modifiers.narrow,
  ])

  return <section className={className}>{children}</section>
}

export function narrow(props: Omit<Props, 'narrow'>): VDOM {
  return component({ ...props, narrow: true })
}

defineDisplayName('Component.Section', { component, narrow })
