import React from 'react'

import * as Metadata from '~/Metadata'
import { SEO } from '~/Component'
import { Article, Author, VDOM, defineDisplayName } from '~/Data'

// const siteQuery = graphql`
//   {
//     allSite {
//       edges {
//         node {
//           siteMetadata {
//             name
//             siteUrl
//           }
//         }
//       }
//     }
//   }
// `

type Props = {
    article: Article
    authors: Author[]
    location: Location
    imagelocation?: string
    theme: Theme
}

export function component(props: Props): VDOM {
    const metadata = Metadata.ask()

    const { article, authors, location } = props

    const image = article.hero.seo.src.includes('ctfassets') ? 'https:' + article.hero.seo.src : metadata.siteURL + article.hero.seo.src

    return (
        <SEO.component
            theme={props.theme}
            author={{
                name: authors.map(author => author.name).join(','),
                slug: authors.map(author => author.slug).join(','),
                bio: authors.map(author => author.bio).join(','),
            }}
            pathname={location.pathname}
            canonicalURL={article.canonical_url}
            description={article.excerpt}
            image={image}
            publishedAt={article.date}
            timeToRead={article.timeToRead}
            title={article.title}
            isBlogPost
            dateForSEO={article.dateForSEO}
        />
    )
}

defineDisplayName('Component.Template.Article.SEO', { component })
