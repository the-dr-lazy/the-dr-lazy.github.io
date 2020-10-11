import React from 'react'

import * as Handlers from '~/Handlers'
import * as Translation from '~/Translation'
import { Icon, Tooltip } from '~/Component'

type Props = { showCopyURLMessage: boolean } & JSX.IntrinsicElements['button']

export function component({ showCopyURLMessage, ...props }: Props) {
    const translation = Translation.ask()
    const { onCopyURLToClipboard } = Handlers.ask()

    return (
        <button onClick={onCopyURLToClipboard} data-a11y="false" aria-label="Copy URL to clipboard" title="Copy URL to clipboard" {...props}>
            <Icon.link />
            <Tooltip.component isActive={showCopyURLMessage}>{translation.copied}</Tooltip.component>
        </button>
    )
}
