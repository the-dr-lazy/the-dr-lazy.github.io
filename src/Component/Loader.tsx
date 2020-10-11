import React from 'react'
import cc from 'classcat'

import { Couplet } from '~/Component'

type Props = {
  className?: string
}

const classNames = {
  block: 'c-loader',
  elements: {
    shape: 'c-loader__shape',
    label: 'c-loader__label',
  },
}

/**
 * Port of https://codepen.io/a-guerrero/pen/XbyPEj
 */
export function component(props: Props) {
  const blockClassName = cc([classNames.block, props.className])

  return (
    <div className={blockClassName}>
      <div className={classNames.elements.shape}></div>
      <Couplet.component
        first="باغبان گر پنج روزی صحبت گل بایدش"
        second="بر جفای خار هجران صبر بلبل بایدش"
        className={classNames.elements.label}
      />
    </div>
  )
}
