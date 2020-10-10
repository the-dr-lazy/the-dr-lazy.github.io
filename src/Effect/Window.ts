import {
  Observable,
  Observer,
  animationFrameScheduler,
  defer,
  fromEvent,
  of,
  EMPTY,
} from 'rxjs'
import { distinctUntilChanged, map, mapTo, observeOn } from 'rxjs/operators'

import { Theme } from '~/Data'

export const location$: Observable<Location> = defer(() =>
  typeof window !== 'undefined' ? of({ ...window.location }) : EMPTY,
)

export const theme$: Observable<Theme> = Observable.create(
  (observer: Observer<Theme>) => {
    if (typeof window === 'undefined') {
      return
    }

    const mq = window.matchMedia('(prefers-color-scheme: dark)')

    function toTheme({ matches }: MediaQueryList | MediaQueryListEvent) {
      return matches ? Theme.Dark : Theme.Light
    }

    observer.next(toTheme(mq))

    mq.addListener(event => observer.next(toTheme(event)))
  },
)
