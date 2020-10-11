import { AnyAction, createActionCreator as mkActionCreator, createReducer as mkReducer, ofType } from 'deox'
import { Observable } from 'rxjs'
import { distinctUntilChanged, map, skip, switchMap, switchMapTo } from 'rxjs/operators'

import * as Effect from '~/Effect'
import * as Rx from '~/Rx'
import { Theme, combineEpics, isLight, mkRehydrateEpic } from '~/Data'

//
// Data Types
//

type State = Theme

//
// Action Creators
//

export const prefer = mkActionCreator('[Theme] set preferred', resolve => (theme: Theme) => resolve(theme))
export const toggle = mkActionCreator('[Theme] toggle')

export const rehydrate = mkActionCreator('[Theme] rehydrate', resolve => (theme: Theme) => resolve(theme))

//
// Reducers
//

const defaultState: State = Theme.Light as Theme

export const reducer = mkReducer(defaultState, handleAction => [
    handleAction([prefer, rehydrate], (_, { payload }) => payload),
    handleAction(toggle, state => (isLight(state) ? Theme.Dark : Theme.Light)),
])

//
// Epics
//

function setClassEpic(_action$: Observable<unknown>, state$: Observable<State>): Observable<never> {
    return state$.pipe(distinctUntilChanged(), switchMap(Effect.DOM.setThemeClass$))
}
function preferredEpic(): Observable<AnyAction> {
    return Effect.Window.theme$.pipe(map(prefer))
}

function persistEpic(action$: Observable<AnyAction>, state$: Observable<State>): Observable<never> {
    return action$.pipe(ofType(toggle), switchMapTo(state$), distinctUntilChanged(), switchMap(Effect.Storage.setTheme$(8 * 60 * 60 * 1000)))
}

function resetStorageEpic(action$: Observable<AnyAction>): Observable<never> {
    return action$.pipe(ofType(prefer), skip(1), switchMapTo(Effect.Storage.removeTheme$))
}

export const epic = combineEpics(
    setClassEpic,
    preferredEpic,
    persistEpic,
    mkRehydrateEpic(Effect.Storage.getTheme$, rehydrate),
    resetStorageEpic,
)
