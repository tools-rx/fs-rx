
import {join, isAbsolute} from 'path'

export function normalizeInput (input) {
  if (typeof input === 'string') {
    return {
      name: input,
      basedir: process.cwd()
    }
  } else if (typeof input === 'object') {
    if (input.name && input.basedir) {
      return input
    } else if (input.name) {
      return Object.assign(input, {
        basedir: process.cwd()
      })
    }
  }

  throw new Error('Could not identify file name from input.')
}

export function fileNameOf (input) {
  return isAbsolute(input.name) ? input.name : join(input.basedir, input.name)
}
