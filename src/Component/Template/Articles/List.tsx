import React from 'react'
import cc from 'classcat'
import * as A from 'fp-ts/lib/ReadonlyArray'
import { pipe } from 'fp-ts/lib/pipeable'

import { Template } from '~/Component'
import { Article, Layout, VDOM, defineDisplayName, isEven, monoidVDOM } from '~/Data'

export * from './List/index'

function mkColumnComponent(props: Template.Articles.List.Column.Props) {
    const { Column } = Template.Articles.List

    return <Column.component key={props.article.id} {...props} />
}

function mkRowComponent(layout: Layout, hasOnlyOneArticle: boolean) {
    const { Row } = Template.Articles.List

    return (index: number, pair: ReadonlyArray<Article>) => {
        const columns = pipe(
            pair,
            A.mapWithIndex((i, article) => ({
                article,
                layout,
                narrow: index % 2 !== i % 2,
            })),
            A.map(mkColumnComponent),
        )

        return (
            <Row.component key={index} layout={layout} hasOnlyOneArticle={hasOnlyOneArticle} reverse={isEven(index)}>
                {columns}
            </Row.component>
        )
    }
}

type Props = {
    articles: ReadonlyArray<Article>
    layout: Layout
    showDetails: boolean
}

const classNames = {
    block: 'c-articles-list',
    modifiers: {
        show: {
            details: '-show-details',
        },
    },
}

export function component({ articles, layout, showDetails }: Props): VDOM {
    if (A.isEmpty(articles)) return monoidVDOM.empty

    const hasOnlyOneArticle = articles.length === 1
    // const { gridLayout = 'tiles', hasSetGridLayout, getGridLayout } = useContext(
    //   GridLayoutContext,
    // )

    /**
     * We're taking the flat array of articles [{}, {}, {}...]
     * and turning it into an array of pairs of articles [[{}, {}], [{}, {}], [{}, {}]...]
     * This makes it simpler to create the grid we want
     */
    const rows = pipe(articles, A.chunksOf(2), A.mapWithIndex(mkRowComponent(layout, hasOnlyOneArticle)))
    // const articlePairs = articles.reduce((result, value, index, array) => {
    //   if (index % 2 === 0) {
    //     result.push(array.slice(index, index + 2))
    //   }
    //   return result
    // }, [])

    // useEffect(() => getGridLayout(), [])
    // const rows = articlePairs.map(([l, r], index) => {})

    // style={{ opacity: hasSetGridLayout ? 1 : 0 }}
    // alwaysShowAllDetails={alwaysShowAllDetails}
    const blockClassNames = cc([classNames.block, showDetails && classNames.modifiers.show.details])

    return <div className={blockClassNames}>{rows}</div>
}
component.defaultProps = { showDetails: false }

defineDisplayName('Component.Template.Articles.List', { component })
