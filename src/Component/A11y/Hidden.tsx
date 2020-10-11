import React from 'react'

type Props = { children: string | string[] }

const classNames = {
    block: 'c-hidden',
}

export function component({ children }: Props) {
    return <span className={classNames.block}>{children}</span>
}
