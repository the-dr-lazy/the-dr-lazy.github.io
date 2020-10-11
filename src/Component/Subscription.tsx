import React from 'react'
import cc from 'classcat'

import { Section, Subscription, Loader } from '~/Component'
import * as Store from '~/Store'
import { useSelector } from 'react-redux'
import { isDark } from '~/Data'

export * from './Subscription/index'

const classNames = {
    block: 'c-subscription',
    elements: {
        image: 'c-subscription__image',
        box: 'c-subscription__box',
        heading: 'c-subscription__heading',
        subheading: 'c-subscription__subheading',
        form: 'c-subscription__form',
        input: 'c-subscription__input',
        emailInput: 'c-subscription__email-input',
        submit: 'c-subscription__submit',
        loader: 'c-subscription__loader',
    },
    modifiers: {
        is: {
            loading: '-is-loading',
        },
    },
}

export function component() {
    const theme = useSelector(Store.getTheme)
    const { isLoading, isSubscribed } = useSelector(Store.getSubscription)

    const blockClassName = cc([classNames.block, isLoading && classNames.modifiers.is.loading])

    const content = isSubscribed ? <Subscription.Subscribed.component /> : <Subscription.Subscribe.component />

    return (
        <Section.narrow>
            <div className={blockClassName}>
                <Subscription.Image.component className={classNames.elements.image} />
                <div className={classNames.elements.box}>
                    {content}
                    {isLoading && <Loader.component className={classNames.elements.loader} />}
                </div>
            </div>
        </Section.narrow>
    )
}
