import React from 'react'
import cc from 'classcat'

type Props = React.PropsWithChildren<{ isActive: boolean }>

const classNames = {
  block: 'c-tooltip',
  modifiers: {
    isActive: '-is-active',
  },
}

export function component({ isActive, ...props }: Props): VDOM {
  const blockClassName = cc([
    classNames.block,
    isActive && classNames.modifiers.isActive,
  ])

  return <div {...props} className={blockClassName} />
}
