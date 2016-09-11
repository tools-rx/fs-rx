
import {readFile} from 'fs'
import {Observable} from 'rxjs'
import {normalizeInput, fileNameOf} from './normalize-input'

const readFileBound = Observable.bindNodeCallback(readFile)

/**
 * Read the contents of a file.
 * @param {object | string} input The file name to read.
 * @param {string} options Options (not required) that are passed to the readFile function.
 * @return {Observable<object>} An observable containing the file name object that includes either a
 *    content property (for string contents) or a buffer property (if the file is read as
 *    as Node Buffer object).
 */
export function readFileRx (input, options) {
  let normalizedInput = normalizeInput(input)
  return readFileBound(fileNameOf(normalizedInput), options)
    .map((content) => {
      return (
        Buffer.isBuffer(content)
          ? Object.assign(normalizedInput, { buffer: content })
          : Object.assign(normalizedInput, { content })
      )
    })
}
