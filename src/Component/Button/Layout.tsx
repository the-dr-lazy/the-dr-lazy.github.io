import React from 'react'
import cc from 'classcat'

import * as Handlers from '~/Handlers'
import { Icon } from '~/Component'

type Props = { isActive: boolean } & Omit<
  JSX.IntrinsicElements['button'],
  'aria-label'
>

const classNames = {
  block: 'c-button-layout',
  elements: {
    icon: 'c-button-layout__icon',
  },
  modifiers: {
    isActive: '-is-active',
  },
}

export function component({ isActive, children, ...props }: Props) {
  const blockClassName = cc([
    classNames.block,
    isActive && classNames.modifiers.isActive,
  ])

  const title = props.title

  return (
    <button
      {...props}
      aria-label={title}
      className={blockClassName}
      data-a11y="false"
    >
      {React.Children.map(
        children,
        child =>
          React.isValidElement(child) &&
          React.cloneElement(child, { className: classNames.elements.icon }),
      )}
    </button>
  )
}

type TilesProps = Omit<Props, 'onClick' | 'title'>

export function tiles(props: TilesProps) {
  const { onSetArticlesLayoutTiles } = Handlers.ask()

  return React.createElement(
    component,
    {
      ...props,
      title: 'Show articles in Tile grid',
      onClick: onSetArticlesLayoutTiles,
    },
    <Icon.tiles />,
  )
}

type RowsProps = Omit<Props, 'onClick' | 'title'>

export function rows(props: RowsProps) {
  const { onSetArticlesLayoutRows } = Handlers.ask()

  return React.createElement(
    component,
    {
      ...props,
      title: 'Show articles in Row grid',
      onClick: onSetArticlesLayoutRows,
    },
    <Icon.rows />,
  )
}
