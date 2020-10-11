import React from 'react'
import { useSelector } from 'react-redux'

import * as Store from '~/Store'
import { Navigation, Promotion } from '~/Component'
import { VDOM, defineDisplayName } from '~/Data'

type Props = React.PropsWithChildren<{}>

const classNames = {
    block: 'c-container',
}

export function component({ children }: Props): VDOM {
    const theme = useSelector(Store.getTheme)
    const showCopyURLMessage = useSelector(Store.getShowCopyURLMessage)

    return (
        <div className={classNames.block}>
            <Promotion.component />
            <Navigation.Header.component showCopyURLMessage={showCopyURLMessage} theme={theme} showBackButton={false} />
            {children}
            <Navigation.Footer.component copyrightFrom={2020} copyrightTo={2020} />
        </div>
    )
}

defineDisplayName('Component.Layout', { component })
