import React from 'react'

import { VDOM } from '~/Data'

type Props = JSX.IntrinsicElements['span']

export function component(props: Props): VDOM {
    return (
        <span {...props} className="c-spacer">
            ...
        </span>
    )
}
