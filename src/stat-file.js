
import {stat, lstat} from 'fs'
import {Observable} from 'rxjs'
import {normalizeInput, fileNameOf} from './normalize-input'

const statBound = Observable.bindNodeCallback(stat)
const lstatBound = Observable.bindNodeCallback(lstat)

/**
 * Get stats for a file.
 * @param {object | string} input The file name to obtain stats for.
 * @return {Observable<object>} An observable containing the file name object that includes
 *    a stats property with the stats obtained.
 */
export function statRx (input) {
  let normalizedInput = normalizeInput(input)
  return statBound(fileNameOf(normalizedInput))
    .map((stats) => {
      return Object.assign(normalizedInput, { stats })
    })
}

/**
 * Get stats for a file (including symbolic links)
 * @param {object | string} input The file name to obtain stats for.
 * @return {Observable<object>} An observable containing the file name object that includes
 *    a stats property with the stats obtained.  The stats will be for the symbolic link
 *    (using lstat) if applicable.
 */
export function lstatRx (input) {
  let normalizedInput = normalizeInput(input)
  return lstatBound(fileNameOf(normalizedInput))
    .map((stats) => {
      return Object.assign(normalizedInput, { stats })
    })
}
