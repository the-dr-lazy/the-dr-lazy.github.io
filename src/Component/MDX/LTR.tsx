import React from 'react'

type Props = Omit<JSX.IntrinsicElements['div'], 'dir'>

export function component(props: Props) {
  return <div {...props} dir="ltr" />
}
