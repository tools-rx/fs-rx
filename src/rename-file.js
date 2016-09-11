
import {relative} from 'path'
import {rename} from 'fs'
import {Observable} from 'rxjs'
import {normalizeInput, fileNameOf} from './normalize-input'

const renameBound = Observable.bindNodeCallback(rename)

/**
 * Rename or move a file or directory.
 * @param {object | string} input The file or directory name to rename.
 * @param {string} newPath The path to rename to.
 * @return {Observable<object>} An observable containing the file name object, where the name
 *    is derived from the newPath relative to the basedir.
 */
export function renameRx (input, newPath) {
  let normalizedInput = normalizeInput(input)
  return renameBound(fileNameOf(normalizedInput), newPath)
    .map(() => Object.assign(normalizedInput, {
      name: unixStylePath(relative(normalizedInput.basedir, newPath))
    }))
}

function unixStylePath (path) {
  return path.replace(/\\/g, '/')
}
