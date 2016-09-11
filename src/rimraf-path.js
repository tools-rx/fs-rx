
import rimraf from 'rimraf'
import {Observable} from 'rxjs'

const rimrafBound = Observable.bindNodeCallback(rimraf)

export function rimrafRx (input, options) {
  return rimrafBound(input, options || {})
    .map(() => ({}))
}
