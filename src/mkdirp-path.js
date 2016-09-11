
import mkdirp from 'mkdirp'
import {Observable} from 'rxjs'

const mkdirpBound = Observable.bindNodeCallback(mkdirp)

export function mkdirpRx (input, options) {
  return mkdirpBound(input, options || {})
    .map(() => ({}))
}
