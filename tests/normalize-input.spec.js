/* eslint-env jasmine */

import {normalizeInput} from '../src/normalize-input'

describe('normalize input', () => {
  const invalidFileErrorText = 'Could not identify file name from input.'

  it('should throw error for undefined input', () => {
    let testFxn = () => {
      normalizeInput()
    }
    expect(testFxn).toThrowError(invalidFileErrorText)
  })

  it('should throw error for invalid input', () => {
    let testFxn = () => {
      normalizeInput(12345)
    }
    expect(testFxn).toThrowError(invalidFileErrorText)
  })

  it('should return object with name for simple string input', () => {
    let result = normalizeInput('a/b/c/my.txt')
    expect(result).toEqual({
      name: 'a/b/c/my.txt',
      basedir: process.cwd()
    })
  })

  it('should return same object if name and basedir properties are present', () => {
    let myObj = {
      name: 'a/b/c/my.txt',
      basedir: process.cwd()
    }
    let result = normalizeInput(myObj)
    expect(result).toBe(myObj)
  })

  it('should return same object with basedir added if name but not basedir properties are present', () => {
    let myObj = {
      name: 'a/b/c/my.txt',
    }
    let result = normalizeInput(myObj)
    expect(result).toBe(myObj)
    expect(result.basedir).toBe(process.cwd())
  })
})
