import React from 'react'
import { useForm, Controller } from 'react-hook-form'

import * as Translation from '~/Translation'
import * as Handlers from '~/Handlers'
import { Heading, Paragraph, Input, Button } from '~/Component'

type Form = {
    firstName: string
    email: string
}

const classNames = {
    block: 'c-subscription-subscribe',
    elements: {
        heading: 'c-subscription-subscribe__heading',
        subheading: 'c-subscription-subscribe__subheading',
        form: 'c-subscription-subscribe__form',
        input: 'c-subscription-subscribe__input',
        emailInput: 'c-subscription-subscribe__email-input',
        submit: 'c-subscription-subscribe__submit',
    },
    modifiers: {
        is: {
            loading: '-is-loading',
        },
    },
}

export function component() {
    const translation = Translation.ask()
    const { onSubscribe } = Handlers.ask()

    const { handleSubmit, control, errors } = useForm<Form>()

    return (
        <div className={classNames.block}>
            <Heading.h3 className={classNames.elements.heading}>{translation.subscription.heading}</Heading.h3>
            <Paragraph.component className={classNames.elements.subheading} dangerouslySetInnerHTML={translation.subscription.subheading} />
            <form className={classNames.elements.form} onSubmit={handleSubmit(onSubscribe)}>
                <Controller
                    as={Input.component}
                    control={control}
                    rules={{
                        required: translation.subscription.form.firstName.required,
                    }}
                    name="firstName"
                    type={Input.Type.Text}
                    label={translation.subscription.form.firstName.label}
                    error={errors?.firstName?.message}
                    className={classNames.elements.input}
                />
                <Controller
                    as={Input.component}
                    control={control}
                    rules={{
                        required: translation.subscription.form.email.required,
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: translation.subscription.form.email.invalid,
                        },
                    }}
                    name="email"
                    type={Input.Type.Email}
                    label={translation.subscription.form.email.label}
                    className={classNames.elements.emailInput}
                    error={errors?.email?.message}
                />
                <Button.component className={classNames.elements.submit} type={Button.Type.Submit}>
                    {translation.subscription.submit}
                </Button.component>
            </form>
        </div>
    )
}
