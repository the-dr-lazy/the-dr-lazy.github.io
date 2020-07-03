import { Observable } from 'rxjs'

export function write(value: string) {
  return Observable.create(observer => {
    const el = document.createElement('textarea')
    el.value = value
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)

    observer.complete()
  })
}
