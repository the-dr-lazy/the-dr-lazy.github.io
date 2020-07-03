import React from 'react'

import { Navigation } from '~/Component'
import { defineDisplayName } from '~/Data'

type Props = Omit<Navigation.Paginator.Props, 'maxPages'>

const classNames = {
  block: 'c-articles-paginator',
}

export function component(props: Props) {
  return (
    <div className={classNames.block}>
      <Navigation.Paginator.component {...props} />
    </div>
  )
}

defineDisplayName('Component.Template.Articles.Paginator', { component })
