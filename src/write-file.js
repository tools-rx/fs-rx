
import {writeFile} from 'fs'
import {Observable} from 'rxjs'
import {normalizeInput, fileNameOf} from './normalize-input'

const writeFileBound = Observable.bindNodeCallback(writeFile)

export function writeFileRx (input, content, options) {
  let normalizedInput = normalizeInput(input)
  return writeFileBound(fileNameOf(normalizedInput), content, options)
    .map(() => normalizedInput)
}
