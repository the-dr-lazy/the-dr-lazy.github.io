import React, { ReactElement } from 'react'
import { Semigroup } from 'fp-ts/lib/Semigroup'
import { Monoid } from 'fp-ts/lib/Monoid'

export type VDOM = ReactElement | null

export const semigroupVDOM: Semigroup<VDOM> = {
    concat(x, y) {
        return (
            <>
                {x}
                {y}
            </>
        )
    },
}

export const monoidVDOM: Monoid<VDOM> = {
    concat: semigroupVDOM.concat,
    empty: null,
}

/**
 * Define module base display name for components.
 */
export function defineDisplayName(moduleName: string, componentMap: { [name: string]: Function }) {
    Object.entries(componentMap).forEach(([name, component]) => {
        Object.defineProperty(component, 'displayName', {
            value: `${moduleName}.${name}`,
        })
    })
}
