export function arrayEmptyUnless<A>(condition: boolean, xs: A[]): A[] {
  return condition ? xs : []
}
