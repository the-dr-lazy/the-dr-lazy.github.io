import React from 'react'
import cc from 'classcat'

import { defineDisplayName, VDOM } from '~/Data'

type Props = JSX.IntrinsicElements['p']

export function component({ className, ...props }: Props): VDOM {
    const blockClassName = cc(['c-paragraph', className])

    return <p {...props} className={blockClassName} />
}

defineDisplayName('Component.Paragraph', { component })
