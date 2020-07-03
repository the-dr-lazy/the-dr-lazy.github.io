import {
  AnyAction,
  createActionCreator as mkActionCreator,
  createReducer as mkReducer,
  ofType,
} from 'deox'
import { constant } from 'fp-ts/lib/function'
import { Observable } from 'rxjs'
import {
  debounceTime,
  delayWhen,
  mapTo,
  pluck,
  switchMapTo,
} from 'rxjs/operators'

import * as Effect from '~/Effect'
import { combineEpics } from '~/Data'

//
// Data Types
//

type State = boolean

//
// Action Creators
//

export const copyURLToClipboard = mkActionCreator('[Copy URL Message] copy')

const show = mkActionCreator('[Copy URL Message] show')
const hide = mkActionCreator('[Copy URL Message] hide')

//
// Reducer
//

const defaultState: State = false

export const reducer = mkReducer(defaultState, handleAction => [
  handleAction(show, constant(true)),
  handleAction(hide, constant(false)),
])

//
// Epics
//

function copyURLToClipboardEpic(
  action$: Observable<AnyAction>,
): Observable<AnyAction> {
  return action$.pipe(
    ofType(copyURLToClipboard),
    switchMapTo(Effect.Window.location$),
    pluck('href'),
    delayWhen(Effect.Clipboard.write),
    mapTo(show()),
  )
}

function hideEpic(action$: Observable<AnyAction>): Observable<AnyAction> {
  return action$.pipe(ofType(show), debounceTime(1000), mapTo(hide()))
}

export const epic = combineEpics(copyURLToClipboardEpic, hideEpic)
