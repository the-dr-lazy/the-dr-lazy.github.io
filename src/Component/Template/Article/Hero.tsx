import React from 'react'

import { Heading, Template, Image } from '~/Component'
import { Article, defineDisplayName, Author } from '~/Data'

type Props = { article: Article; author: Author }

const classNames = {
  block: 'c-template-article-hero',
  elements: {
    header: 'c-template-article-hero__header',
    title: 'c-template-article-hero__title',
    subtitle: 'c-template-article-hero__subtitle',
    author: 'c-template-article-hero__author',
    meta: 'c-template-article-hero__meta',
    image: 'c-template-article-hero__image',
  },
}

export function component(props: Props) {
  const { title, date, timeToRead, hero } = props.article

  const hasHeroImage =
    hero &&
    Object.keys(hero.full).length !== 0 &&
    hero.full.constructor === Object

  return (
    <div className={classNames.block}>
      <header className={classNames.elements.header}>
        <Heading.h1 className={classNames.elements.title}>{title}</Heading.h1>
        <div className={classNames.elements.subtitle}>
          <Template.Article.Author.component author={props.author} />
          <div className={classNames.elements.meta}>
            {date} · {timeToRead} min read
          </div>
        </div>
      </header>
      <div className={classNames.elements.image} id="ArticleImage__Hero">
        {hasHeroImage ? (
          <Image.component src={hero.full} />
        ) : (
          <Image.Placeholder.component />
        )}
      </div>
    </div>
  )
}

defineDisplayName('Component.Template.Article.Hero', { component })
