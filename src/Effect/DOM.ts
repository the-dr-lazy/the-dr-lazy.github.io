import {
  EMPTY,
  Observable,
  animationFrameScheduler,
  combineLatest,
  defer,
  fromEvent,
} from 'rxjs'
import {
  distinctUntilChanged,
  map,
  observeOn,
  startWith,
  switchMap,
} from 'rxjs/operators'

import { ScrollPosition, Theme, Direction } from '~/Data'

const classNames = {
  modifiers: {
    theme: {
      [Theme.Light]: '-theme-light',
      [Theme.Dark]: '-theme-dark',
    },
    scrollPosition: {
      [ScrollPosition.Top]: '-scroll-position-top',
      [ScrollPosition.Bottom]: '-scroll-position-bottom',
    },
    direction: {
      [Direction.RTL]: '-direction-rtl',
      [Direction.LTR]: '-direction-ltr',
    },
  },
}

function setClass$<A extends string>(map: { [key in A]: string }) {
  const keys = Object.values<string>(map)

  return (next: A): Observable<never> =>
    defer(() => {
      document.documentElement.classList.remove(...keys)
      document.documentElement.classList.add(map[next])

      return EMPTY
    })
}

export const setThemeClass$ = setClass$(classNames.modifiers.theme)

// export function setThemeClass$(theme: Theme): Observable<never> {
//   return defer(() => {
//     document.documentElement.classList.remove(
//       ...Object.values(classNames.modifiers.theme),
//     )
//     document.documentElement.classList.add(classNames.modifiers.theme[theme])

//     return EMPTY
//   })
// }

export const setScrollPositionClass$ = setClass$(
  classNames.modifiers.scrollPosition,
)

// export function setScrollPositionClass$(
//   scrollPosition: ScrollPosition,
// ): Observable<never> {
//   return defer(() => {
//     document.documentElement.classList.remove(
//       ...Object.values(classNames.modifiers.scrollPosition),
//     )
//     document.documentElement.classList.add(
//       classNames.modifiers.scrollPosition[scrollPosition],
//     )

//     return EMPTY
//   })
// }

export const setDirectionClass$ = setClass$(classNames.modifiers.direction)

export const scrollTop$: Observable<number> = fromEvent(window, 'scroll').pipe(
  observeOn(animationFrameScheduler),
  map(() => document.documentElement.scrollTop),
  startWith(document.documentElement.scrollTop),
  distinctUntilChanged(),
)

export const scrollHeight$: Observable<number> = fromEvent(
  window,
  'resize',
).pipe(
  observeOn(animationFrameScheduler),
  map(() => document.documentElement.scrollHeight),
  startWith(document.documentElement.scrollHeight),
  distinctUntilChanged(),
)

export const scrollPosition$: Observable<ScrollPosition> = combineLatest(
  scrollTop$,
  scrollHeight$,
  (scrollTop, scrollHeight) =>
    scrollTop / scrollHeight >= 0.5
      ? ScrollPosition.Bottom
      : ScrollPosition.Top,
).pipe(distinctUntilChanged())

export const setScrollPosition$ = scrollPosition$.pipe(
  switchMap(setScrollPositionClass$),
)
