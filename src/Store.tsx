import React from 'react'
import * as Redux from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware } from 'redux-observable'
import { identity } from 'fp-ts/lib/function'

import { VDOM } from '~/Data'

import { Action, State, epic, reducer } from './Store/index'

export * from './Store/index'

export function mkStore() {
  const epicMiddleware = createEpicMiddleware<Action, Action, State>()

  const store = Redux.createStore(
    reducer,
    composeWithDevTools(Redux.applyMiddleware(epicMiddleware)),
  )

  epicMiddleware.run(epic)

  return store
}

export function provider(props: React.PropsWithChildren<{}>): VDOM {
  const store = mkStore()

  return <Provider {...props} store={store} />
}

export const getRoot: (state: State) => State = identity

export function getTheme({ theme }: State) {
  return theme
}

export function getShowCopyURLMessage({ showCopyURLMessage }: State) {
  return showCopyURLMessage
}

export function getLanguage({ language }: State) {
  return language
}

export function getSubscription({ subscription }: State) {
  return subscription
}
