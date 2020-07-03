import React from 'react'
import cc from 'classcat'

import { Layout, defineDisplayName } from '~/Data'

type Props = React.PropsWithChildren<{
  layout: Layout
  hasOnlyOneArticle: boolean
  reverse: boolean
}>

const classNames = {
  block: 'c-articles-list-row',
  modifiers: {
    layout: {
      [Layout.Tiles]: '-layout-tiles',
      [Layout.Rows]: '-layout-rows',
    },
    sort: {
      reverse: '-sort-reverse',
    },
    hasOnlyOneArticle: '-has-only-one-article',
  },
}

export function component({
  layout,
  hasOnlyOneArticle,
  reverse,
  ...props
}: Props) {
  const blockClassName = cc([
    classNames.block,
    classNames.modifiers.layout[layout],
    reverse && classNames.modifiers.sort.reverse,
    hasOnlyOneArticle && classNames.modifiers.hasOnlyOneArticle,
  ])

  return <div {...props} className={blockClassName}></div>
}

defineDisplayName('Component.Template.Articles.List.Row', { component })
