import React from 'react'
import { isNone, none, Option, some } from 'fp-ts/lib/Option'
import { useSelector } from 'react-redux'

import * as Store from '~/Store'
import { Language } from '~/Data'

type Markup = { __html: string }

type Translation = {
  copied: string
  paginator: {
    previous: string
    of: string
    next: string
  }
  subscription: {
    heading: string
    subheading: Markup
    form: {
      firstName: {
        label: string
        required: string
      }
      email: {
        label: string
        required: string
        invalid: string
      }
    }
    submit: string
    subscribed: string
    resubscribe: string
  }
  suggestions: {
    heading: string
  }
}

const fa: Translation = {
  copied: 'کپی شد',
  paginator: {
    previous: 'قبلی',
    of: 'از',
    next: 'بعدی',
  },
  subscription: {
    heading: 'خبرنامه',
    subheading: {
      __html:
        'با عضویت در خبرنامه، می‌تونی از آخرین مطالب من از طریق ایمیل مطلع بشی و <b>همواره امکان لغو عضویت را خواهی داشت</b>.',
    },
    form: {
      firstName: {
        label: 'نام کوچک',
        required: 'لطفا نام کوچکت را وارد کن',
      },
      email: {
        label: 'ایمیل',
        required: 'لطفا ایمیلت‌ را وارد کن',
        invalid: 'این ایمیل درست نیست',
      },
    },
    submit: 'عضویت رایگان',
    subscribed: 'شما عضو خبرنامه شده‌اید.',
    resubscribe: 'عضویت مجدد',
  },
  suggestions: {
    heading: 'پیشنهاد مطالعه',
  },
}

type Translations = { [K in Language]: Translation }

const translations: Translations = { [Language.FA]: fa }

const context = React.createContext<Option<Translation>>(none)

export function provider(props: React.PropsWithChildren<{}>) {
  const language = useSelector(Store.getLanguage)

  const { Provider } = context

  return <Provider {...props} value={some(translations[language])} />
}

export function ask(): Translation {
  const translation = React.useContext(context)

  if (isNone(translation)) {
    throw new Error(`
      No Translation provided.
      Please ensure you have provided Handlers.
    `)
  }

  return translation.value
}
