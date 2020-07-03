import React from 'react'
import * as t from 'io-ts'
import * as O from 'fp-ts/lib/Option'
import { graphql, useStaticQuery } from 'gatsby'
import { Option, isNone, none } from 'fp-ts/lib/Option'
import { optionFromNullable } from 'io-ts-types/lib/optionFromNullable'
import { ThrowReporter } from 'io-ts/lib/ThrowReporter'

import { VDOM } from '~/Data'

export const Metadata = t.type({
  title: t.string,
  name: t.string,
  siteURL: t.string,
  basePath: t.string,
  description: t.string,
  hero: t.string,
  social: t.type({
    twitter: optionFromNullable(t.string),
    github: optionFromNullable(t.string),
  }),
})

export type Metadata = t.TypeOf<typeof Metadata>

const context = React.createContext<Option<Metadata>>(none)

export function provider(props: React.PropsWithChildren<{}>): VDOM {
  const query = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          basePath
          description
          hero
          name
          siteURL
          social {
            github
            twitter
          }
          title
        }
      }
    }
  `)

  const { Provider } = context
  const validation = Metadata.decode(query.site.siteMetadata)

  ThrowReporter.report(validation)

  return <Provider value={O.fromEither(validation)} {...props} />
}

export function ask(): Metadata {
  const environment = React.useContext(context)

  if (isNone(environment)) {
    throw new Error(`
      No Metadata provided.
      Please ensure you have provided Metadata.
    `)
  }

  return environment.value
}
