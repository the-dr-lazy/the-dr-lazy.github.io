import React from 'react'
import * as A from 'fp-ts/lib/ReadonlyArray'
import { PageProps } from 'gatsby'
import { useSelector } from 'react-redux'
import { isNone } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

import * as Store from '~/Store'
import { Template, SEO, Section } from '~/Component'
import {
  Article,
  Author,
  VDOM,
  defineDisplayName,
  isFeaturedAuthor,
} from '~/Data'

type Props = PageProps<
  undefined,
  {
    pageCount: number
    group: Article[]
    authors: Author[]
    basePath: string
    index: number
  }
>

export function component(props: Props): VDOM {
  const state = useSelector(Store.getRoot)

  const articles = props.pageContext.group
  const featuredAuthor = pipe(
    props.pageContext.authors,
    A.findFirst(isFeaturedAuthor),
  )

  if (isNone(featuredAuthor)) {
    throw new Error(`
     No featured Author found.
     Please ensure you have at least featured Author.
    `)
  }

  return (
    <>
      <SEO.component pathname={location.pathname} />
      <Template.Articles.Hero.component
        articlesLayout={state.articles.layout}
        featuredAuthor={featuredAuthor.value}
      />
      <Section.narrow>
        <Template.Articles.List.component
          layout={state.articles.layout}
          articles={articles}
        />
        <Template.Articles.Paginator.component
          total={props.pageContext.pageCount}
          current={props.pageContext.index}
          basePath={props.pageContext.basePath}
        />
        <Template.Articles.Gradient.component />
      </Section.narrow>
    </>
  )
}

export default component

defineDisplayName('Template.Articles', { component })
