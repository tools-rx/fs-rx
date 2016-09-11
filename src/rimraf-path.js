
import rimraf from 'rimraf'
import {Observable} from 'rxjs'

const rimrafBound = Observable.bindNodeCallback(rimraf)

/**
 * Use rimraf to delete all files and directories.
 * @param {string} input The file or directory name to delete.
 * @param {object} options Options (not required) that are passed to the rimraf function.
 * @return {Observable<object>} An observable containing an empty object.
 */
export function rimrafRx (input, options) {
  return rimrafBound(input, options || {})
    .map(() => ({}))
}
