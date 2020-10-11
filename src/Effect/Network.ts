import { fromEvent, merge, Observable, of, BehaviorSubject } from 'rxjs'
import { constant } from 'fp-ts/lib/function'

enum Status {
    Online = 'online',
    Offline = 'offline',
}

function mkStatus$(): BehaviorSubject<Status> {
    if (typeof window === 'undefined') {
        return new BehaviorSubject(<Status>Status.Online)
    }

    const subject = new BehaviorSubject(window.navigator.onLine ? Status.Online : Status.Offline)

    merge(
        fromEvent<Status>(window, 'online', constant(Status.Online)),
        fromEvent<Status>(window, 'offline', constant(Status.Offline)),
    ).subscribe(subject)

    return subject
}

// const status$: BehaviorSubject<Status> = mkStatus$()

// const status$: Observable<Status> = merge(
//   of(window.navigator.onLine ? Status.Online : Status.Offline),
//   fromEvent<Status>(window, 'online', constant(Status.Online)),
//   fromEvent<Status>(window, 'offline', constant(Status.Offline)),
// ).pipe(shareReplay(1))
