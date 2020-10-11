import { ActionType } from 'deox'
import { combineReducers } from 'redux'
import { constant } from 'fp-ts/lib/function'

import * as Effect from '~/Effect'
import { combineEpics } from '~/Data'

import * as ShowCopyURLMessage from './ShowCopyURLMessage'
import * as Articles from './Articles'
import * as Theme from './Theme'
import * as Subscription from './Subscription'
import * as Language from './Language'

export { setLayoutRows as setArticlesLayoutRows, setLayoutTiles as setArticlesLayoutTiles } from './Articles'
export { copyURLToClipboard } from './ShowCopyURLMessage'
export { toggle as toggleTheme } from './Theme'
export { resubscribe } from './Subscription'

export const subscribe = Subscription.subscribe.next

export const reducer = combineReducers({
    articles: Articles.reducer,
    showCopyURLMessage: ShowCopyURLMessage.reducer,
    theme: Theme.reducer,
    subscription: Subscription.reducer,
    language: Language.reducer,
})

export type State = ReturnType<typeof reducer>

export type Action = ActionType<typeof reducer>

const combinedEpic = combineEpics({
    articles: Articles.epic,
    showCopyURLMessage: ShowCopyURLMessage.epic,
    theme: Theme.epic,
    subscription: Subscription.epic,
    language: Language.epic,
})

export const epic = combineEpics(combinedEpic, constant(Effect.DOM.setScrollPosition$))
