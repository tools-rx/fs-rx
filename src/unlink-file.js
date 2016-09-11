
import {unlink} from 'fs'
import {Observable} from 'rxjs'
import {normalizeInput, fileNameOf} from './normalize-input'

const unlinkBound = Observable.bindNodeCallback(unlink)

export function unlinkRx (input) {
  let normalizedInput = normalizeInput(input)
  return unlinkBound(fileNameOf(normalizedInput))
    .map((content) => normalizedInput)
}
