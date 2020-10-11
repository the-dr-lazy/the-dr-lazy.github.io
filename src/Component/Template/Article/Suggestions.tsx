import React from 'react'
import cc from 'classcat'
import * as O from 'fp-ts/lib/Option'
import { isSome, isNone } from 'fp-ts/lib/Option'

import * as Translation from '~/Translation'
import { VDOM, Article, monoidVDOM } from '~/Data'
import { Section, Heading, Template } from '~/Component'

export * from './Suggestions/index'

type Props = {
    articles: ReadonlyArray<Article>
}

const classNames = {
    block: 'c-article-suggestions',
    elements: {
        heading: 'c-article-suggestions__heading',
        row: 'c-article-suggestions__row',
    },
    modifiers: {
        hasOnlyOneArticle: '-has-only-one-article',
    },
}

export function component(props: Props): VDOM {
    const articles = props.articles.map(O.fromNullable)

    if (articles.every(isNone)) {
        return monoidVDOM.empty
    }

    const translation = Translation.ask()

    const [left, right] = articles

    const { Column } = Template.Article.Suggestions

    const rowClassName = cc([classNames.elements.row, articles.length === 1 && classNames.modifiers.hasOnlyOneArticle])

    return (
        <Section.narrow className={classNames.block}>
            <Heading.h3 className={classNames.elements.heading}>{translation.suggestions.heading}</Heading.h3>
            <div className={rowClassName}>
                <Column.component article={left} />
                <Column.component article={right} narrow />
            </div>
        </Section.narrow>
    )
}
