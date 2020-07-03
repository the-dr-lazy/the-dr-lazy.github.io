import React from 'react'
import cc from 'classcat'
import { VDOM, Article, defineDisplayName } from '~/Data'
import { Link } from 'gatsby'
import { Heading, Image } from '~/Component'

type Props = { article: Article; narrow: boolean }

const classNames = {
  block: 'c-article-suggestions-column',
  elements: {
    container: 'c-article-suggestions-column__container',
    image: 'c-article-suggestions-column__image',
    title: 'c-article-suggestions-column__title',
    excerpt: 'c-article-suggestions-column__excerpt',
    metadata: 'c-article-suggestions-column__metadata',
  },
  modifiers: {
    overflow: '-overflow',
    narrow: '-narrow',
  },
}

export function component(props: Props): VDOM {
  const { narrow } = props
  const { slug, hero, title, excerpt, date, timeToRead } = props.article

  const hasOverflow = narrow && title.length > 35
  const imageSource = narrow ? hero.narrow : hero.regular

  const blockClassName = cc([
    classNames.block,
    narrow && classNames.modifiers.narrow,
    hasOverflow && classNames.modifiers.overflow,
  ])

  return (
    <Link className={blockClassName} to={slug} data-a11y="false">
      <div className={classNames.elements.container}>
        <div className={classNames.elements.image}>
          <Image.component src={imageSource} />
        </div>
        <Heading.h3 className={classNames.elements.title}>{title}</Heading.h3>
        <p className={classNames.elements.excerpt}>{excerpt}</p>
        <div className={classNames.elements.metadata}>
          {date} · {timeToRead} min read
        </div>{' '}
      </div>
    </Link>
  )
}
component.defaultProps = { narrow: false }

defineDisplayName('Component.Template.Article.Suggestions.Column', {
  component,
})
