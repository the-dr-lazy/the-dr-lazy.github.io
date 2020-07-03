import React from 'react'
import cc from 'classcat'

import { VDOM, defineDisplayName } from '~/Data'

export * from './Button/index'

export enum Type {
  Button = 'button',
  Submit = 'submit',
}

type Props = Omit<JSX.IntrinsicElements['button'], 'type'> & { type: Type }

export function component({ className, ...props }: Props): VDOM {
  const blockClassName = cc(['c-button', className])

  return <button {...props} data-a11y="false" className={blockClassName} />
}
component.defaultProps = { type: Type.Button }

defineDisplayName('Component.Button', { component })
