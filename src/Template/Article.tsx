import React from 'react'
import { PageProps } from 'gatsby'

import * as Store from '~/Store'
import { Template, Progress, Subscription } from '~/Component'
import { Author, VDOM, Article } from '~/Data'
import { useSelector } from 'react-redux'

type Props = PageProps<
  undefined,
  {
    article: Article
    authors: Author[]
    basePath: string
    permalink: string
    slug: string
    id: string
    title: string
    canocicalURL: string
    next: Article[]
  }
>

function component(props: Props): VDOM {
  const state = useSelector(Store.getRoot)

  const { location } = props
  const { article, authors, next } = props.pageContext
  const author = authors[0]

  return (
    <>
      <Template.Article.SEO.component
        article={article}
        authors={authors}
        location={location}
      />
      <Template.Article.Hero.component article={article} author={author} />
      <Template.Article.Body.component
        theme={state.theme}
        children={article.body}
      />
      {article.subscription && <Subscription.component />}
      <Template.Article.Suggestions.component articles={[next[0], next[1]]} />
    </>
  )
}
// function component() {
//   return (
//     <Layout.component>
//       <Article.SEO article={article} authors={authors} location={location} />
//       <Article.Hero article={article} authors={authors} />
//       <Article.Aside contentHeight={contentHeight}>
//         <Progress contentHeight={contentHeight} />
//       </ArticleAside>
//       <MobileControls>
//         <ArticleControls />
//       </MobileControls>
//       <Article.Body ref={contentSectionRef}>
//         <MDXRenderer content={article.body}>
//           <ArticleShare />
//         </MDXRenderer>
//       </ArticleBody>
//       {mailchimp && article.subscription && <Subscription.component />}
//       {next.length > 0 && (
//         <Article.Suggestion articles={next} />
//         <NextArticle narrow>
//           <FooterNext>More articles from {name}</FooterNext>
//           <ArticlesNext articles={next} />
//           <FooterSpacer />
//         </NextArticle>
//       )}
//     </Layout.component>
//   )
// }

export default component
