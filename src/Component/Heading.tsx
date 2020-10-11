import React from 'react'
import cc from 'classcat'

import { defineDisplayName } from '~/Data'

export enum Level {
    H1 = 'h1',
    H2 = 'h2',
    H3 = 'h3',
    H4 = 'h4',
    H5 = 'h5',
    H6 = 'h6',
}

export type Props = { level: Level } & JSX.IntrinsicElements['h1']

const classNames = {
    block: 'c-heading',
    modifiers: {
        level: {
            [Level.H1]: '-level-h1',
            [Level.H2]: '-level-h2',
            [Level.H3]: '-level-h3',
            [Level.H4]: '-level-h4',
            [Level.H5]: '-level-h5',
            [Level.H6]: '-level-h6',
        },
    },
}

export function component({ className, level, ...props }: Props) {
    const blockClassName = cc([classNames.block, classNames.modifiers.level[level], className])

    return React.createElement(level, { ...props, className: blockClassName })
}

function mkLevelComponent(level: Level) {
    function c(props: Omit<Props, 'level'>) {
        return component({ ...props, level })
    }

    return c
}

export const h1 = mkLevelComponent(Level.H1)
export const h2 = mkLevelComponent(Level.H2)
export const h3 = mkLevelComponent(Level.H3)
export const h4 = mkLevelComponent(Level.H4)
export const h5 = mkLevelComponent(Level.H5)
export const h6 = mkLevelComponent(Level.H6)

defineDisplayName('Component.Heading', { component, h1, h2, h3, h4, h5, h6 })
