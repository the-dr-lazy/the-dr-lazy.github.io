import {
  AnyAction,
  createActionCreator as mkActionCreator,
  createReducer as mkReducer,
  ofType,
} from 'deox'
import { Observable } from 'rxjs'
import { isSome } from 'fp-ts/lib/Option'
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  switchMapTo,
  tap,
} from 'rxjs/operators'

import * as Effect from '~/Effect'
import * as Rx from '~/Rx'
import { Layout, combineEpics, mkRehydrateEpic } from '~/Data'

//
// Data Types
//

type State = Layout

//
// Action Creators
//

const set = mkActionCreator(
  '[Articles Layout] set',
  resolve => (layout: Layout) => resolve(layout),
)

export function setTiles() {
  return set(Layout.Tiles)
}

export function setRows() {
  return set(Layout.Rows)
}

export const rehydrate = mkActionCreator(
  '[Articles Layout] rehydrate',
  resolve => (layout: Layout) => resolve(layout),
)

//
// Reducers
//

const defaultState: State = Layout.Tiles as Layout

export const reducer = mkReducer(defaultState, handleAction => [
  handleAction([set, rehydrate], (_, { payload }) => payload),
])

//
// Epics
//

function persistEpic(
  action$: Observable<AnyAction>,
  state$: Observable<State>,
): Observable<never> {
  return action$.pipe(
    ofType(set),
    switchMapTo(state$),
    distinctUntilChanged(),
    switchMap(Effect.Storage.setArticlesLayout$),
  )
}

export const epic = combineEpics(
  persistEpic,
  mkRehydrateEpic(Effect.Storage.getArticlesLayout$, rehydrate),
)
