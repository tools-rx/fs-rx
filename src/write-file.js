
import {writeFile} from 'fs'
import {Observable} from 'rxjs'
import {normalizeInput, fileNameOf} from './normalize-input'

const writeFileBound = Observable.bindNodeCallback(writeFile)

/**
 * Write the contents of a file.
 * @param {object | string} input The file name to write.
 * @param {string | Buffer} content Data to write.
 * @param {string} options Options (not required) that are passed to the writeFile function.
 * @return {Observable<object>} An observable containing the file name object.
 */
export function writeFileRx (input, content, options) {
  let normalizedInput = normalizeInput(input)
  return writeFileBound(fileNameOf(normalizedInput), content, options)
    .map(() => normalizedInput)
}
