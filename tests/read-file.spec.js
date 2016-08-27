/* eslint-env jasmine */

import {join} from 'path'
import {readFileRx} from '../src/read-file'
import {buildFileSet} from 'test-files-rx'
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

describe('readFileRx', () => {
  beforeEach((done) => {
    buildFileSet(fileSet).subscribe(getSubscriber(done))
  })

  it('should read the contents of a file', (done) => {
    const fileName = localFileName('tmp.txt')
    readFileRx(fileName, 'utf-8')
      .do((fileInfo) => {
        expect(typeof fileInfo.content).toEqual('string')
        expect(fileInfo.content).toEqual('content tmp.txt')
      })
      .subscribe(getSubscriber(done))
  })

  it('should read the contents of a file as node buffer', (done) => {
    const fileName = localFileName('tmp.txt')
    readFileRx(fileName)
      .do((fileInfo) => {
        expect(typeof fileInfo.buffer).toEqual('object')
        expect(Buffer.isBuffer(fileInfo.buffer)).toBe(true)
        expect(fileInfo.buffer.toString()).toEqual('content tmp.txt')
      })
      .subscribe(getSubscriber(done))
  })

  it('should return the file info object within content property', (done) => {
    const fileInfo = {
      basedir: fileSet.localPath,
      name: 'tmp.txt'
    }
    readFileRx(fileInfo, 'utf-8')
      .do((info) => {
        expect(typeof info).toEqual('object')
        expect(info).toEqual({
          basedir: fileSet.localPath,
          name: 'tmp.txt',
          content: 'content tmp.txt'
        })
      })
      .subscribe(getSubscriber(done))
  })
})
