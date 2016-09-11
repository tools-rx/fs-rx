
import {relative} from 'path'
import {rename} from 'fs'
import {Observable} from 'rxjs'
import {normalizeInput, fileNameOf} from './normalize-input'

const renameBound = Observable.bindNodeCallback(rename)

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
