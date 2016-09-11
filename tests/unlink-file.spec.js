/* eslint-env jasmine */

import {join} from 'path'
import {unlinkRx} from '../src/unlink-file'
import {buildFileSet, bashFileSearch} from 'test-files-rx'
import {getSubscriber} from './test-helpers'

export const fileSet = {
  localFiles: [
    'tmp.txt'
  ],
  rootPath: '/tmp/fs-test',
  localPath: join(__dirname, '..', 'fs-test')
}

function localFileName (name) {
  return join(fileSet.localPath, name)
}

describe('unlinkRx', () => {
  beforeEach((done) => {
    buildFileSet(fileSet).subscribe(getSubscriber(done))
  })

  it('should delete the file', (done) => {
    const fileName = localFileName('tmp.txt')
    unlinkRx(fileName)
      .mergeMap(() => bashFileSearch('**/*', fileSet.localPath))
      .do((fileList) => {
        expect(fileList).toEqual({
          pattern: '**/*',
          matches: []
        })
      })
      .subscribe(getSubscriber(done))
  })

  it('should return the file info object', (done) => {
    const fileInfo = {
      basedir: fileSet.localPath,
      name: 'tmp.txt'
    }
    unlinkRx(fileInfo)
      .do((info) => {
        expect(typeof info).toEqual('object')
        expect(info).toEqual({
          basedir: fileSet.localPath,
          name: 'tmp.txt'
        })
      })
      .subscribe(getSubscriber(done))
  })
})
