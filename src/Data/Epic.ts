import { AnyAction } from 'deox'
import { Observable, merge } from 'rxjs'
import { pluck, map } from 'rxjs/operators'
import { Option } from 'fp-ts/lib/Option'

import * as Rx from '~/Rx'

/**
 * Type adjusted epic!
 */
export type Epic<TInput extends AnyAction, TOutput extends AnyAction, TState, TEnvironment> = (
    action$: Observable<TInput>,
    state$: Observable<TState>,
    environment: TEnvironment,
) => Observable<TOutput>

type EpicsMap<TInput extends AnyAction, TOutput extends AnyAction, TState extends {}, TEnvironment> = {
    [TKey in keyof TState]: Epic<TInput, TOutput, TState[TKey], TEnvironment>
}

/**
 * Identical as redux-observable's combineEpics with replaced Epic type.
 */
export function combineEpics<TInput extends AnyAction, TOutput extends AnyAction, TState, TEnvironment>(
    ...epics: Epic<TInput, TOutput, TState, TEnvironment>[]
): Epic<TInput, TOutput, TState, TEnvironment>
export function combineEpics<TInput extends AnyAction, TOutput extends AnyAction, TState extends {}, TEnvironment>(
    epicsMap: EpicsMap<TInput, TOutput, TState, TEnvironment>,
): Epic<TInput, TOutput, TState, TEnvironment>
export function combineEpics(
    epicOrEpicsMap: Epic<AnyAction, AnyAction, unknown, unknown> | EpicsMap<AnyAction, AnyAction, {}, unknown>,
    ...args: Epic<AnyAction, AnyAction, unknown, unknown>[]
): Epic<AnyAction, AnyAction, unknown, unknown> {
    if (typeof epicOrEpicsMap === 'object') {
        return (action$, state$, environment) =>
            merge(...Object.entries(epicOrEpicsMap).map(([key, epic]) => epic(action$, state$.pipe(pluck(key)), environment)))
    }

    const epics = [epicOrEpicsMap, ...args]

    return (action$, state$, environment) => merge(...epics.map(epic => epic(action$, state$, environment)))
}

export function mkRehydrateEpic<A>(get$: Observable<A>, mkAction: (a: A) => AnyAction) {
    return (): Observable<AnyAction> => get$.pipe(map(mkAction))
}
