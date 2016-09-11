/* eslint-env jasmine */

import {join} from 'path'
import {mkdirpRx} from '../src/mkdirp-path'
import {buildFileSet, bashFileSearch} from 'test-files-rx'
import {getSubscriber, sortedFileList} from './test-helpers'

export const fileSet = {
  localFiles: [
    'tmp.txt',
    'a/one.txt'
  ],
  rootPath: '/tmp/fs-test',
  localPath: join(__dirname, '..', 'fs-test')
}

function localFileName (name) {
  return join(fileSet.localPath, name)
}

describe('mkdirpfRx', () => {
  beforeEach((done) => {
    buildFileSet(fileSet).subscribe(getSubscriber(done))
  })

  it('should create directories', (done) => {
    mkdirpRx(localFileName('a/b/c/d'))
      .mergeMap(() => bashFileSearch('**/*', fileSet.localPath))
      .do((result) => {
        expect(sortedFileList(result.matches)).toEqual(sortedFileList([
          'tmp.txt',
          'a',
          'a/one.txt',
          'a/b',
          'a/b/c',
          'a/b/c/d'
        ]))
      })
      .subscribe(getSubscriber(done))
  })

  it('should return an empty object', (done) => {
    mkdirpRx(localFileName('a/b/c/d'))
      .do((result) => {
        expect(typeof result).toEqual('object')
        expect(result).toEqual({})
      })
      .subscribe(getSubscriber(done))
  })
})
