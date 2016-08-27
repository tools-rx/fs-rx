
import {readFile} from 'fs'
import {Observable} from 'rxjs'
import {normalizeInput, fileNameOf} from './normalize-input'

const readFileBound = Observable.bindNodeCallback(readFile)

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
