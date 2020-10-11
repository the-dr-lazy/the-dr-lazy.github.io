import React from 'react'

import * as Metadata from '~/Metadata'
import { HorizontalRule, Navigation, Section, SocialLinks } from '~/Component'
import { VDOM, defineDisplayName } from '~/Data'

export * from './Footer/index'

function formatCopyright(year: string, name: string) {
    return `© ${year} ${name}`
}

function formatCopyrightYear(from: number, to: number) {
    return from === to ? from.toString() : `${from}-${to}`
}

type Props = { copyrightFrom: number; copyrightTo: number }

const classNames = {
    block: 'c-navigation-footer',
    elements: {
        copyright: 'c-navigation-footer__copyright',
    },
}

export function component({ copyrightFrom, copyrightTo }: Props): VDOM {
    const metadata = Metadata.ask()
    // const results = useStaticQuery(siteQuery)
    // const { name, social } = results.allSite.edges[0].node.siteMetadata

    // const copyrightDate = (() => {
    //   const { edges } = results.allMdx
    //   const years = [0, edges.length - 1].map(edge =>
    //     new Date(edges[edge].node.frontmatter.date).getFullYear(),
    //   )
    //   return years[0] === years[1] ? `${years[0]}` : `${years[0]}–${years[1]}`
    // })()
    const copyright = formatCopyright(formatCopyrightYear(copyrightFrom, copyrightTo), metadata.name)

    return (
        <>
            <Navigation.Footer.Gradient.component />
            <Section.narrow>
                <HorizontalRule.component />
                <div className={classNames.block}>
                    <div className={classNames.elements.copyright}>{copyright}</div>
                    <SocialLinks.component />
                </div>
            </Section.narrow>
        </>
    )
}

defineDisplayName('Component.Navigation.Footer', { component })
