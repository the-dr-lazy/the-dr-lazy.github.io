import React from 'react'

import * as Metadata from '~/Metadata'
import { Bio, Button, Section } from '~/Component'
import { Author, Layout, VDOM, defineDisplayName, isRows, isTiles } from '~/Data'

type Props = {
    articlesLayout: Layout
    featuredAuthor: Author
}

const classNames = {
    elements: {
        headingContainer: 'c-articles-hero__heading-container',
        heading: 'c-articles-hero__heading',
        subheading: 'c-articles-hero__subheading',
        controls: 'c-articles-hero__controls',
    },
}

export function component({ articlesLayout, featuredAuthor }: Props): VDOM {
    const metadata = Metadata.ask()

    // style={{ maxWidth: `${hero.maxWidth}px` }}
    return (
        <Section.component>
            <div className={classNames.elements.headingContainer}>
                <h1 className={classNames.elements.heading} dangerouslySetInnerHTML={{ __html: metadata.hero }} />
            </div>
            <div className={classNames.elements.subheading}>
                <Bio.component author={featuredAuthor} />
                <div className={classNames.elements.controls}>
                    <Button.Layout.tiles isActive={isTiles(articlesLayout)} />
                    <Button.Layout.rows isActive={isRows(articlesLayout)} />
                </div>
            </div>
        </Section.component>
    )
}

defineDisplayName('Component.Template.Articles.Hero', { component })
