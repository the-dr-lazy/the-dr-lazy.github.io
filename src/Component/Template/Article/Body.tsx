import React from 'react'

import { MDX } from '~/Component'
import { VDOM, defineDisplayName } from '~/Data'

type Props = MDX.Props

export function component(props: Props): VDOM {
    return (
        <article className="c-article-body">
            <MDX.component {...props} />
        </article>
    )
}

defineDisplayName('Component.Template.Article.Body', { component })
