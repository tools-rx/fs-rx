/* eslint-env jasmine */

import {join} from 'path'
import {normalizeInput, fileNameOf} from '../src/normalize-input'

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
      name: 'a/b/c/my.txt'
    }
    let result = normalizeInput(myObj)
    expect(result).toBe(myObj)
    expect(result.basedir).toBe(process.cwd())
  })

  it('should throw error for object with no name and basedir', () => {
    let testFxn = () => {
      normalizeInput({})
    }
    expect(testFxn).toThrowError(invalidFileErrorText)
  })
})

describe('file name of function', () => {
  it('should combine basedir and name if not absolute path', () => {
    let fileName = fileNameOf({
      basedir: '/tmp/a/b',
      name: 'c/d/e'
    })
    expect(fileName).toEqual(join('/tmp/a/b', 'c/d/e'))
  })

  it('should only use name if absolute path', () => {
    let fileName = fileNameOf({
      basedir: '/tmp/a/b',
      name: '/tmp/abs-path/c/d/e'
    })
    expect(fileName).toEqual('/tmp/abs-path/c/d/e')
  })
})
