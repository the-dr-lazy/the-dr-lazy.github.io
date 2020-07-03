import {
  createActionCreator as mkActionCreator,
  createReducer as mkReducer,
  AnyAction,
  ofType,
} from 'deox'
import { constant } from 'fp-ts/lib/function'
import { Option, none, some } from 'fp-ts/lib/Option'

import { combineReducers } from 'redux'
import { Observable, of } from 'rxjs'
import {
  switchMap,
  mapTo,
  catchError,
  distinctUntilChanged,
  debounceTime,
  pluck,
  switchMapTo,
  tap,
  defaultIfEmpty,
} from 'rxjs/operators'

import * as Effect from '~/Effect'
import { combineEpics, mkRehydrateEpic } from '~/Data'

//
// Data Types
//

type State = {
  isSubscribed: boolean
  isLoading: boolean
}

//
// Action Creators
//

export const subscribe = {
  next: mkActionCreator(
    '[Subscription] subscribe/next',
    resolve => (spec: Effect.Subscription.SubscribeSpec) => resolve(spec),
  ),
  error: mkActionCreator('[Subscription] subscribe/error'),
  complete: mkActionCreator('[Subscription] subscribe/complete'),
}

export const resubscribe = mkActionCreator('[Subscroption] resubscribe')

const rehydrate = mkActionCreator(
  '[Subscription] rehydrate',
  resolve => (isSubscribed: boolean) => resolve(isSubscribed),
)

//
// Reducers
//

const isSubscribedReducer = mkReducer(
  <State['isSubscribed']>false,
  handleAction => [
    handleAction(subscribe.complete, constant(true)),
    handleAction(resubscribe, constant(false)),
    handleAction(rehydrate, (_, { payload }) => payload),
  ],
)

const isLoadingReducer = mkReducer(<State['isLoading']>false, handleAction => [
  handleAction(subscribe.next, constant(true)),
  handleAction([subscribe.error, subscribe.complete], constant(false)),
])

export const reducer = combineReducers({
  isSubscribed: isSubscribedReducer,
  isLoading: isLoadingReducer,
})

//
// Epics
//

function subscribeEpic(action$: Observable<AnyAction>): Observable<AnyAction> {
  return action$.pipe(
    ofType(subscribe.next),
    pluck('payload'),
    switchMap(spec =>
      Effect.Subscription.subscribe$(spec).pipe(
        defaultIfEmpty(subscribe.complete()),
        catchError(constant(of(subscribe.error()))),
      ),
    ),
  )
}

function resubscribeEpic(action$: Observable<AnyAction>): Observable<never> {
  return action$.pipe(
    ofType(resubscribe),
    switchMapTo(Effect.Storage.removeSubscription$),
  )
}

function persistIsSubscribedEpic(
  _action$: Observable<AnyAction>,
  state$: Observable<State['isSubscribed']>,
): Observable<never> {
  return state$.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(Effect.Storage.setSubscription$),
  )
}

const persistEpic = combineEpics({ isSubscribed: persistIsSubscribedEpic })

export const epic = combineEpics(
  subscribeEpic,
  resubscribeEpic,
  persistEpic,
  mkRehydrateEpic(Effect.Storage.getSubscription$, rehydrate),
)
