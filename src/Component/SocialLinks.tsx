import React, { ReactElement } from 'react'
import * as R from 'fp-ts/lib/ReadonlyRecord'
import { identity } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'

import * as Metadata from '~/Metadata'
import { A11y, Icon } from '~/Component'
import { VDOM, defineDisplayName } from '~/Data'

type Socials = keyof Metadata.Metadata['social']

type IconsMap = {
    [K in Socials]: ReactElement
}

const iconsMap: IconsMap = {
    twitter: <Icon.twitter />,
    github: <Icon.github />,
    // youtube: Icon.youtube,
}

const classNames = {
    block: 'c-social-links',
    elements: {
        item: 'c-social-links__item',
        icon: 'c-social-links__icon',
    },
}

function mkSocialLink(name: Socials, link: string): VDOM {
    // const C = iconsMap[name]
    const icon = React.Children.map(
        iconsMap[name],
        child => React.isValidElement(child) && React.cloneElement(child, { className: classNames.elements.icon }),
    )

    return (
        <a
            className={classNames.elements.item}
            key={name}
            target="_blank"
            rel="noopener noreferrer nofollow"
            data-a11y="false"
            aria-label={`Link to ${name}`}
            href={link}
        >
            {icon}
            <A11y.Hidden.component>Link to {name}</A11y.Hidden.component>
        </a>
    )
}

export function component(): VDOM {
    const { social } = Metadata.ask()

    const socialLinks = pipe(social, R.filterMap(identity), R.mapWithIndex(mkSocialLink))

    return <div className={classNames.block}>{Object.values(socialLinks)}</div>
}

defineDisplayName('Component.SocialLinks', { component })
