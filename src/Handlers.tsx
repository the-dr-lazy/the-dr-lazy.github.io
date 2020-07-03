import React from 'react'
import * as Redux from 'redux'
import { Option, isNone, none, some } from 'fp-ts/lib/Option'
import { useDispatch } from 'react-redux'

import * as Store from '~/Store'
import * as Effect from '~/Effect'
import { VDOM } from '~/Data'

type Handlers = {
  onSetArticlesLayoutRows(): void
  onSetArticlesLayoutTiles(): void
  onToggleTheme(): void
  onCopyURLToClipboard(): void
  onSubscribe(spec: Effect.Subscription.SubscribeSpec): void
  onResubscribe(): void
}

const handlers: Handlers = {
  onSetArticlesLayoutRows: Store.setArticlesLayoutRows,
  onSetArticlesLayoutTiles: Store.setArticlesLayoutTiles,
  onToggleTheme: Store.toggleTheme,
  onCopyURLToClipboard: Store.copyURLToClipboard,
  onSubscribe: Store.subscribe,
  onResubscribe: Store.resubscribe,
}

function mkHandlers(dispatch: Redux.Dispatch): Handlers {
  return Redux.bindActionCreators(handlers, dispatch)
}

const context = React.createContext<Option<Handlers>>(none)

export function provider(props: React.PropsWithChildren<{}>): VDOM {
  const dispatch = useDispatch()

  const { Provider } = context

  return <Provider value={some(mkHandlers(dispatch))} {...props}></Provider>
}

export function ask(): Handlers {
  const handlers = React.useContext(context)

  if (isNone(handlers)) {
    throw new Error(`
      No Handlers provided.
      Please ensure you have provided Handlers.
    `)
  }

  return handlers.value
}
