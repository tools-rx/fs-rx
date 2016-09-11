
import mkdirp from 'mkdirp'
import {Observable} from 'rxjs'

const mkdirpBound = Observable.bindNodeCallback(mkdirp)

/**
 * Make directories, including all that don't exist.
 * @param {string} input The directory to create, including any intermediate directories.
 * @param {string} options Options (not required) that are passed to the mkdirp function.
 * @return {Observable<object>} An observable containing an empty object.
 */
export function mkdirpRx (input, options) {
  return mkdirpBound(input, options || {})
    .map(() => ({}))
}
