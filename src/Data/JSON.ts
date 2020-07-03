import { Decoder } from 'io-ts'
import * as E from 'fp-ts/lib/Either'
import * as O from 'fp-ts/lib/Option'
import { flow } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import { Option } from 'fp-ts/lib/Option'
import { parseJSON, toError } from 'fp-ts/lib/Either'

/**
 * Decodes JSON string to a type
 */
export function json<A>(decoder: Decoder<unknown, A>) {
  const decode = flow(decoder.decode, E.mapLeft(toError))

  return (input: string): Option<A> =>
    pipe(parseJSON(input, toError), E.chain(decode), O.fromEither)
}
