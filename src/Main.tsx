import React from 'react'
import { WrapRootElementNodeArgs } from 'gatsby'

import * as Handlers from '~/Handlers'
import * as Metadata from '~/Metadata'
import * as Store from '~/Store'
import * as Translation from '~/Translation'
import * as MDX from '~/MDX'
import { Layout } from '~/Component'
import { VDOM, defineDisplayName } from '~/Data'

import './Main.scss'

export function component({ element }: WrapRootElementNodeArgs): VDOM {
  return (
    <Store.provider>
      <Translation.provider>
        <Handlers.provider>
          <Metadata.provider>
            <MDX.provider>
              <Layout.component>{element}</Layout.component>
            </MDX.provider>
          </Metadata.provider>
        </Handlers.provider>
      </Translation.provider>
    </Store.provider>
  )
}

defineDisplayName('Main', { component })
