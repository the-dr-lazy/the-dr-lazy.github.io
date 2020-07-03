import React from 'react'
import * as O from 'fp-ts/lib/Option'
import { constant } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import { Helmet } from 'react-helmet'

import * as Metadata from '~/Metadata'
import {
  VDOM,
  defineDisplayName,
  optionToArrayConcatMap,
  optionToArrayMap,
} from '~/Data'
import { isSome } from 'fp-ts/lib/Option'

type Props = React.PropsWithChildren<{
  title?: string
  description?: string
  pathname: string
  image?: string
  url?: string
  canonicalURL?: string | null
  publishedAt?: string
  dateForSEO?: string
  timeToRead?: number
  isBlogPost?: boolean
  author?: {
    slug: string
    name: string
    bio: string
  }
}>

function mkSiteSchema(props: Props & { socials: string; pageURL: string }) {
  const metadata = Metadata.ask()

  const { pageURL, socials } = props
  const name = props.title || metadata.name
  const description = props.description || metadata.description

  return `{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "${metadata.siteURL}/#organization",
        "name": "${metadata.title}",
        "url": "${metadata.siteURL}",
        "sameAs": ${socials},
        "logo": {
          "@type": "ImageObject",
          "@id": "${metadata.siteURL}/#logo",
          "inLanguage": "en-US",
          "url": "${metadata.siteURL}/icons/icon-512x512.png",
          "width": 512,
          "height": 512,
          "caption": "${metadata.title}"
        },
        "image": {
          "@id": "${metadata.siteURL}/#logo"
        }
      },
      {
        "@type": "WebSite",
        "@id": "${metadata.siteURL}/#website",
        "url": "${metadata.siteURL}",
        "name": "${metadata.name}",
        "description": "${metadata.description}",
        "publisher": {
          "@id": "${metadata.siteURL}/#organization"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": [
          "WebPage"
        ],
        "@id": "${pageURL}/#webpage",
        "url": "${pageURL}",
        "name": "${name}",
        "isPartOf": {
          "@id": "${metadata.siteURL}/#website"
        },
        "about": {
          "@id": "${metadata.siteURL}/#organization"
        },
        "description": "${description}",
        "inLanguage": "en-US"
      },
      {
        "@type": "BreadcrumbList",
        "description": "Breadcrumbs list",
        "itemListElement": [
          {
            "@type": "ListItem",
            "item": "${metadata.siteURL}",
            "name": "Homepage",
            "position": "1"
          }
        ],
        "name": "Breadcrumbs"
      }
    ]
  }
`.replace(/"[^"]+"|(\s)/gm, function (matched, group1) {
    if (!group1) {
      return matched
    } else {
      return ''
    }
  })
}

function mkBlogSchema(props: Props & { socials: string; pageURL: string }) {
  const metadata = Metadata.ask()

  const {
    title,
    dateForSEO,
    socials,
    description,
    pageURL,
    image,
    author,
  } = props

  return `{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "${metadata.siteURL}/#organization",
        "name": "${metadata.title}",
        "url": "${metadata.siteURL}",
        "sameAs": ${socials},
        "logo": {
          "@type": "ImageObject",
          "@id": "${metadata.siteURL}/#logo",
          "inLanguage": "en-US",
          "url": "${metadata.siteURL}/icons/icon-512x512.png",
          "width": 512,
          "height": 512,
          "caption": "${metadata.title}"
        },
        "image": {
          "@id": "${metadata.siteURL}/#logo"
        }
      },
      {
        "@type": "WebSite",
        "@id": "${metadata.siteURL}/#website",
        "url": "${metadata.siteURL}",
        "name": "${metadata.name}",
        "description": "${metadata.description.replace(/"/g, '\\"')}",
        "publisher": {
          "@id": "${metadata.siteURL}/#organization"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "ImageObject",
        "@id": "${pageURL}/#primaryimage",
        "inLanguage": "en-US",
        "url": "${image}",
        "width": 1200,
        "height": 628
      },
      {
        "@type": [
          "WebPage"
        ],
        "@id": "${pageURL}/#webpage",
        "url": "${pageURL}",
        "name": "${title}",
        "isPartOf": {
          "@id": "${metadata.siteURL}/#website"
        },
        "primaryImageOfPage": {
          "@id": "${pageURL}/#primaryimage"
        },
        "datePublished": "${dateForSEO}",
        "dateModified": "${dateForSEO}",
        "description": "${description}",
        "breadcrumb": {
          "@id": "${pageURL}/#breadcrumb"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "${pageURL}/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "WebPage",
              "@id": "${metadata.siteURL}",
              "url": "${metadata.siteURL}",
              "name": "Home"
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "WebPage",
              "@id": "${pageURL}",
              "url": "${pageURL}",
              "name": "${title}"
            }
          }
        ]
      },
      {
        "@type": "Article",
        "@id": "${pageURL}/#article",
        "isPartOf": {
          "@id": "${pageURL}/#webpage"
        },
        "author": {
          "@id": "${metadata.siteURL}/#/schema${author?.slug}"
        },
        "headline": "${title}",
        "datePublished": "${dateForSEO}",
        "dateModified": "${dateForSEO}",
        "mainEntityOfPage": {
          "@id": "${pageURL}/#webpage"
        },
        "publisher": {
          "@id": "${metadata.siteURL}/#organization"
        },
        "image": {
          "@id": "${pageURL}/#primaryimage"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": [
          "Person"
        ],
        "@id": "${metadata.siteURL}/#/schema${author?.slug}",
        "name": "${author?.name}",
        "image": {
          "@type": "ImageObject",
        "@id": "${metadata.siteURL}/#personlogo",
          "inLanguage": "en-US",
          "caption": "${author?.name}"
        },
        "description": "${author?.bio}",
        "sameAs": ${socials}
      }
    ]
  }
`.replace(/"[^"]+"|(\s)/gm, function (matched, group1) {
    if (!group1) {
      return matched
    } else {
      return ''
    }
  })
}

export function component(props: Props): VDOM {
  const metadata = Metadata.ask()

  const fullURL = (path: string) =>
    path ? `${metadata.siteURL}${path}` : metadata.siteURL

  const { children, pathname, canonicalURL, isBlogPost } = props

  const title = props.title || metadata.title
  const description = props.description || metadata.description
  const image = pipe(
    props.image,
    O.fromNullable,
    O.map(fullURL),
    O.getOrElse(constant('/preview.jpg')),
  )
  const publishedAt = O.fromNullable(props.publishedAt)
  const timeToRead = O.fromNullable(props.timeToRead)

  const pageURL = metadata.siteURL + pathname

  const socials = JSON.stringify(
    Object.values(metadata.social)
      .filter(isSome)
      .map(({ value }) => value),
  )

  const schema = isBlogPost
    ? mkBlogSchema({ ...props, socials, pageURL })
    : mkSiteSchema({ ...props, socials, pageURL })

  const meta = Array.prototype.concat(
    [
      { charset: 'utf-8' },
      {
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=edge',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'theme-color',
        content: '#fff',
      },
      { itemprop: 'name', content: title },
      { itemprop: 'description', content: description },
      { itemprop: 'image', content: image },
      { name: 'description', content: description },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:metadata', content: metadata.name },
      { name: 'twitter:title', content: title },
      {
        name: 'twitter:description',
        content: description,
      },
      {
        name: 'twitter:image',
        content: image,
      },

      { property: 'og:title', content: title },
      { property: 'og:url', content: pageURL },
      { property: 'og:image', content: image },
      {
        property: 'og:description',
        content: description,
      },
      { property: 'og:metadata_name', content: metadata.title },
      { property: 'og:type', content: 'webmetadata' },
    ],
    optionToArrayMap(metadata.social.twitter, content => ({
      name: 'twitter:creator',
      content,
    })),
    optionToArrayMap(publishedAt, content => ({
      name: 'article:published_time',
      content,
    })),
    optionToArrayConcatMap(timeToRead, x => [
      { name: 'twitter:label1', value: 'Reading time' },
      { name: 'twitter:data1', value: `${x} min read` },
    ]),
  )

  return (
    <Helmet title={title} htmlAttributes={{ lang: 'fa' }} meta={meta}>
      <script type="application/ld+json">{schema}</script>
      {canonicalURL && <link rel="canonical" href={canonicalURL} />}
      {children}
    </Helmet>
  )
}
component.defaultProps = {
  isBlogPost: false,
}

defineDisplayName('Component.SEO', { component })
