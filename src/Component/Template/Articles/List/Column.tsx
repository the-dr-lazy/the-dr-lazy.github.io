import React from 'react'
import cc from 'classcat'
import { Link } from 'gatsby'

import { Heading, Image } from '~/Component'
import { Article, Layout, defineDisplayName } from '~/Data'

export type Props = { article: Article; layout: Layout; narrow: boolean }

const classNames = {
  block: 'c-articles-list-column',
  elements: {
    link: 'c-articles-list-column__link',
    image: 'c-articles-list-column__image',
    title: 'c-articles-list-column__title',
    excerpt: 'c-articles-list-column__excerpt',
    metadata: 'c-articles-list-column__metadata',
  },
  modifiers: {
    layout: {
      [Layout.Tiles]: '-layout-tiles',
      [Layout.Rows]: '-layout-rows',
    },
    hasOverflow: '-has-overflow',
    narrow: '-narrow',
  },
}

export function component({ article, layout, narrow }: Props) {
  const hasOverflow = narrow && article.title.length > 35
  const imageSource = narrow ? article.hero.narrow : article.hero.regular
  const hasHeroImage =
    imageSource &&
    Object.keys(imageSource).length !== 0 &&
    imageSource.constructor === Object

  const image = hasHeroImage ? (
    <Image.component src={imageSource} />
  ) : (
    <Image.Placeholder.component />
  )

  const blockClassName = cc([
    classNames.block,
    classNames.modifiers.layout[layout],
    hasOverflow && classNames.modifiers.hasOverflow,
    narrow && classNames.modifiers.narrow,
  ])

  return (
    <Link
      className={classNames.elements.link}
      to={article.slug}
      data-a11y="false"
    >
      <div className={blockClassName}>
        <div className={classNames.elements.image}>{image}</div>
        <div>
          <Heading.h2 className={classNames.elements.title}>
            {article.title}
          </Heading.h2>
          <p className={classNames.elements.excerpt}>{article.excerpt}</p>
          <div className={classNames.elements.metadata}>
            {article.date} · {article.timeToRead} min read
          </div>
        </div>
      </div>
    </Link>
  )
}

defineDisplayName('Component.Template.Articles.List.Column', { component })
