/* eslint-env jasmine */

import path from 'path'
import fs from 'fs'
import {writeFileRx} from '../src/write-file'
import {Observable} from 'rxjs'
import {buildFileSet} from 'test-files-rx'
import {getSubscriber} from './test-helpers'

const readFileBound = Observable.bindNodeCallback(fs.readFile)

export const fileSet = {
  localFiles: [
    'tmp.txt'
  ],
  rootPath: '/tmp/fs-test',
  localPath: path.join(__dirname, '..', 'fs-test')
}

function localFileName (name) {
  return path.join(fileSet.localPath, name)
}

fdescribe('writeFileRx', () => {
  beforeEach((done) => {
    buildFileSet(fileSet).subscribe(getSubscriber(done))
  })

  it('should update the contents of an existing file', (done) => {
    const fileName = localFileName('tmp.txt')
    writeFileRx(fileName, 'updated content')
      .mergeMap(() => readFileBound(fileName, 'utf-8'))
      .do((content) => {
        expect(typeof content).toEqual('string')
        expect(content).toEqual('updated content')
      })
      .subscribe(getSubscriber(done))
  })

  it('should write the contents of a new file', (done) => {
    const fileName = localFileName('new-file.txt')
    writeFileRx(fileName, 'new content')
      .mergeMap(() => readFileBound(fileName, 'utf-8'))
      .do((content) => {
        expect(typeof content).toEqual('string')
        expect(content).toEqual('new content')
      })
      .subscribe(getSubscriber(done))
  })

  it('should return the file info object', (done) => {
    const fileInfo = {
      basedir: fileSet.localPath,
      name: 'tmp.txt'
    }
    writeFileRx(fileInfo, 'updated content')
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
