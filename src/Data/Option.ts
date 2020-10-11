import { Option, isSome } from 'fp-ts/lib/Option'

/**
 * Isomorphism of Option to ReadonlyArray
 */
export function optionToArray<A>(option: Option<A>): ReadonlyArray<A> {
    return isSome(option) ? [option.value] : []
}

export function optionToArrayMap<A, B>(option: Option<A>, f: (a: A) => B): ReadonlyArray<B> {
    return optionToArray(option).map(f)
}

export function optionToArrayConcatMap<A, B>(option: Option<A>, f: (a: A) => ReadonlyArray<B>): ReadonlyArray<B> {
    return optionToArrayMap(option, f).flat()
}
