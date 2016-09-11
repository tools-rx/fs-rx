
import {stat, lstat} from 'fs'
import {Observable} from 'rxjs'
import {normalizeInput, fileNameOf} from './normalize-input'

const statBound = Observable.bindNodeCallback(stat)
const lstatBound = Observable.bindNodeCallback(lstat)

export function statRx (input) {
  let normalizedInput = normalizeInput(input)
  return statBound(fileNameOf(normalizedInput))
    .map((stats) => {
      return Object.assign(normalizedInput, { stats })
    })
}

export function lstatRx (input) {
  let normalizedInput = normalizeInput(input)
  return lstatBound(fileNameOf(normalizedInput))
    .map((stats) => {
      return Object.assign(normalizedInput, { stats })
    })
}
