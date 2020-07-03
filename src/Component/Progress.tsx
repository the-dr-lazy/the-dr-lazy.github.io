import React from 'react'

import { defineDisplayName, VDOM } from '~/Data'

type Props = { value: number }

const classNames = {
  block: 'c-progress',
  elements: {
    trackline: 'c-progress__trackline',
    progressLine: 'c-progress__progress-line',
  },
}

export function component({ value }: Props): VDOM {
  return (
    <div className={classNames.block} tabIndex={-1}>
      <div className={classNames.elements.trackline} aria-hidden="true">
        <div
          className={classNames.elements.progressLine}
          style={{ transform: `translateY(${value * 100}%)` }}
        />
      </div>
    </div>
  )
}

defineDisplayName('Component.Progress', { component })
