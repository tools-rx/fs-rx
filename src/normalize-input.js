
import {join, isAbsolute} from 'path'

/**
 * Normalize an input file name
 * @param {string | object} input Either a file name (relative to the current working directory)
 *    or an object with a basedir and name property (like what is returned from the globRx function).
 * @return {object} A normalized object with a name and basedir property.
 */
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

/**
 * From a normalized input file name, return the file name string.
 * @param {object} input A normalized file name with a basedir and name property.
 * @return {string} The file name.
 */

export function fileNameOf (input) {
  return isAbsolute(input.name) ? input.name : join(input.basedir, input.name)
}
