import * as O from 'fp-ts/lib/Option'
import * as t from 'io-ts'
// import { Option } from 'fp-ts/lib/Option'
import { EMPTY, Observable, defer, of, NEVER } from 'rxjs'
import { DateFromNumber as numberDateC } from 'io-ts-types/lib/DateFromNumber'
import { pipe } from 'fp-ts/lib/pipeable'

import * as Rx from '~/Rx'
import { Layout, Theme, json, layoutC, themeC } from '~/Data'
import { mergeMap } from 'rxjs/operators'

enum Key {
    Theme = 'theme',
    ArticlesLayout = 'articles.layout',
    Subscription = 'subscription',
}

function mkEntityC<A>(valueC: t.Type<A>) {
    return t.type({
        value: valueC,
        expiry: t.number,
        createdAt: numberDateC,
    })
}

type Entity = t.TypeOf<ReturnType<typeof mkEntityC>>

function isEntityExpired({ expiry, createdAt }: Entity): boolean {
    return expiry !== 0 && createdAt.getTime() + expiry < Date.now()
}

function set$(key: Key, value: unknown, expiry: number): Observable<never> {
    return defer(() => {
        localStorage.setItem(key, JSON.stringify({ value, expiry, createdAt: Date.now() }))

        return EMPTY
    })
}

function get$<A>(key: Key, codec: t.Type<A>): Observable<A> {
    return defer(() => {
        if (typeof window === 'undefined') {
            return NEVER
        }

        const entity = pipe(window.localStorage.getItem(key), O.fromNullable, O.chain(json(mkEntityC(codec))))

        return Rx.fromOption(entity).pipe(mergeMap(entity => (isEntityExpired(entity) ? remove$(key) : of(entity.value))))
    })
}

function remove$(key: Key): Observable<never> {
    return defer(() => {
        window.localStorage.removeItem(key)

        return EMPTY
    })
}

export function setTheme$(expiry: number) {
    return (value: Theme) => set$(Key.Theme, value, expiry)
}

export const getTheme$ = get$(Key.Theme, themeC)

export const removeTheme$ = remove$(Key.Theme)

export function setArticlesLayout$(value: Layout) {
    return set$(Key.ArticlesLayout, value, 0)
}

export const getArticlesLayout$ = get$(Key.ArticlesLayout, layoutC)

export function setSubscription$(value: boolean) {
    return set$(Key.Subscription, value, 0)
}

export const getSubscription$ = get$(Key.Subscription, t.boolean)

export const removeSubscription$ = remove$(Key.Subscription)
