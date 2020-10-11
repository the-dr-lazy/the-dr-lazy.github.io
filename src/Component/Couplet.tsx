import React from 'react'
import cc from 'classcat'

type Props = { second: string; first: string; className?: string }

const classNames = {
    block: 'c-couplet',
    elements: {
        space: 'c-couplet__space',
    },
}

export function component({ className, second, first }: Props) {
    return (
        <p className={cc([classNames.block, className])}>
            {first}
            <span className={classNames.elements.space} />
            {second}
        </p>
    )
}
