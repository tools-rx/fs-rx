
import {unlink} from 'fs'
import {Observable} from 'rxjs'
import {normalizeInput, fileNameOf} from './normalize-input'

const unlinkBound = Observable.bindNodeCallback(unlink)

/**
 * Delete a file.
 * @param {object | string} input The file name to delete.
 * @return {Observable<object>} An observable containing the file information object.
 */
export function unlinkRx (input) {
  let normalizedInput = normalizeInput(input)
  return unlinkBound(fileNameOf(normalizedInput))
    .map((content) => normalizedInput)
}
