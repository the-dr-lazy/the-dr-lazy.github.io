import { Observable, of } from 'rxjs'

import { filter, pluck } from 'rxjs/operators'
import { isSome, Option } from 'fp-ts/lib/Option'

export function some<A>(source: Observable<Option<A>>): Observable<A> {
  return source.pipe(filter(isSome), pluck('value'))
}

export function fromOption<A>(option: Option<A>) {
  return of(option).pipe(some)
}
