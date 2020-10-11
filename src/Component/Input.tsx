import React, { ReactNode } from 'react'
import cc from 'classcat'

import { VDOM, defineDisplayName } from '~/Data'

const classNames = {
    block: 'c-input',
    elements: {
        container: 'c-input__container',
        label: 'c-input__label',
        input: 'c-input__input',
        error: 'c-input__error',
    },
    modifiers: {
        has: {
            error: '-has-error',
            filled: '-has-filled',
        },
        direction: {
            ltr: '-direction-ltr',
        },
    },
}

export enum Type {
    Text = 'text',
    Email = 'email',
}

function isTypeEmail(type: Type) {
    return type === Type.Email
}

type Props = {
    label: string
    value?: string
    error?: ReactNode
    type: Type
} & JSX.IntrinsicElements['input']

export function component({ className, value, label, error, ...props }: Props): VDOM {
    const blockClassName = cc([classNames.block, error && classNames.modifiers.has.error, value && classNames.modifiers.has.filled, className])

    const { type } = props
    const inputClassName = cc([classNames.elements.input, isTypeEmail(type) && classNames.modifiers.direction.ltr])

    return (
        <div className={blockClassName}>
            <label htmlFor={props.id} className={classNames.elements.container}>
                <input {...props} className={inputClassName} />
                <span className={classNames.elements.label}>{label}</span>
            </label>
            <span className={classNames.elements.error}>{error}</span>
        </div>
    )
}

defineDisplayName('Component.Input', { component })
