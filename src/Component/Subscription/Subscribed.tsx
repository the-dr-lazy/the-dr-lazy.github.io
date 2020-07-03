import React from 'react'

import * as Translation from '~/Translation'
import * as Handlers from '~/Handlers'
import { VDOM, defineDisplayName } from '~/Data'
import { Paragraph } from '~/Component'

const classNames = {
  block: 'c-subscription-subscribed',
  elements: {
    message: 'c-subscription-subscribed__message',
    resubscribe: 'c-subscription-subscribed__resubscribe',
  },
}

export function component(): VDOM {
  const translation = Translation.ask()
  const { onResubscribe } = Handlers.ask()

  return (
    <div className={classNames.block}>
      <Paragraph.component className={classNames.elements.message}>
        {translation.subscription.subscribed}
      </Paragraph.component>
      <button
        className={classNames.elements.resubscribe}
        onClick={onResubscribe}
        data-a11y="false"
      >
        {translation.subscription.resubscribe}
      </button>
    </div>
  )
}

defineDisplayName('Component.Subscription.Subscribed', { component })
