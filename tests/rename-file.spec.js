/* eslint-env jasmine */

import {join} from 'path'
import {renameRx} from '../src/rename-file'
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

describe('renameRx', () => {
  beforeEach((done) => {
    buildFileSet(fileSet).subscribe(getSubscriber(done))
  })

  it('should rename the file', (done) => {
    const oldFileName = localFileName('tmp.txt')
    const newFileName = localFileName('tmp-renamed.txt')
    renameRx(oldFileName, newFileName)
      .mergeMap(() => bashFileSearch('**/*', fileSet.localPath))
      .do((result) => {
        expect(sortedFileList(result.matches)).toEqual(sortedFileList([
          'tmp-renamed.txt',
          'a',
          'a/one.txt'
        ]))
      })
      .subscribe(getSubscriber(done))
  })

  it('should move the file', (done) => {
    const oldFileName = localFileName('tmp.txt')
    const newFileName = localFileName('a/two.txt')
    renameRx(oldFileName, newFileName)
      .mergeMap(() => bashFileSearch('**/*', fileSet.localPath))
      .do((result) => {
        expect(sortedFileList(result.matches)).toEqual(sortedFileList([
          'a',
          'a/one.txt',
          'a/two.txt'
        ]))
      })
      .subscribe(getSubscriber(done))
  })

  it('should return the file info object', (done) => {
    const fileInfo = {
      basedir: fileSet.localPath,
      name: 'tmp.txt'
    }
    renameRx(fileInfo, localFileName('tmp-renamed.txt'))
      .do((info) => {
        expect(typeof info).toEqual('object')
        expect(info).toEqual({
          basedir: fileSet.localPath,
          name: 'tmp-renamed.txt'
        })
      })
      .subscribe(getSubscriber(done))
  })

  it('should return relative file info object', (done) => {
    const fileInfo = {
      basedir: fileSet.localPath,
      name: 'tmp.txt'
    }
    renameRx(fileInfo, localFileName('a/moved.txt'))
      .do((info) => {
        expect(typeof info).toEqual('object')
        expect(info).toEqual({
          basedir: fileSet.localPath,
          name: 'a/moved.txt'
        })
      })
      .subscribe(getSubscriber(done))
  })
})
