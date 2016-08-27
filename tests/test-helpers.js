/* eslint-env jasmine */

export function getSubscriber (done) {
  return {
    next () { },
    error (err) { done.fail(err) },
    complete () { done() }
  }
}
