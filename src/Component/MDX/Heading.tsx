import cc from 'classcat'

import { defineDisplayName } from '~/Data'

import { Level, component, Props } from '../Heading'

function mkLevelComponent(level: Level) {
    function c({ className, ...props }: Omit<Props, 'level'>) {
        return component({
            ...props,
            className: cc(['c-mdx-heading', className]),
            level,
        })
    }

    return c
}

export const h1 = mkLevelComponent(Level.H2)
export const h2 = mkLevelComponent(Level.H2)
export const h3 = mkLevelComponent(Level.H3)
export const h4 = mkLevelComponent(Level.H4)
export const h5 = mkLevelComponent(Level.H5)
export const h6 = mkLevelComponent(Level.H6)

defineDisplayName('Component.Heading', { component, h1, h2, h3, h4, h5, h6 })
