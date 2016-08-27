
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
