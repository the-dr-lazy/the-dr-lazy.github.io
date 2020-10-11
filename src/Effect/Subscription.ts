import addToMailchimp from 'gatsby-plugin-mailchimp'
import { defer, Observable, throwError, EMPTY } from 'rxjs'
import { mergeMap } from 'rxjs/operators'

export enum SubscribeError {
    Conflict,
}

export type SubscribeSpec = {
    firstName: string
    email: string
}

export function subscribe$({ email, firstName: FNAME }: SubscribeSpec): Observable<never> {
    return defer(() => addToMailchimp(email, { FNAME })).pipe(
        mergeMap(({ result, msg }) => (result === 'success' ? EMPTY : throwError(new Error(msg)))),
    )
}
