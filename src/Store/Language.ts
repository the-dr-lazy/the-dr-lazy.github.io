import { constant } from 'fp-ts/lib/function'

import { Observable } from 'rxjs'
import { AnyAction } from 'deox'
import { distinctUntilChanged, switchMap, map } from 'rxjs/operators'

import * as Effect from '~/Effect'
import { Language, mkDirection, combineEpics } from '~/Data'

//
// Data Types
//

type State = Language

//
// Reducers
//

const defaultState: State = Language.FA

export const reducer = constant(defaultState)

//
// Epics
//

function setClassEpic(
  _action$: Observable<AnyAction>,
  state$: Observable<State>,
) {
  return state$.pipe(
    distinctUntilChanged(),
    map(mkDirection),
    switchMap(Effect.DOM.setDirectionClass$),
  )
}

export const epic = combineEpics(setClassEpic)
