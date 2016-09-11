/* eslint-env jasmine */

import {join} from 'path'
import {rimrafRx} from '../src/rimraf-path'
import {buildFileSet, bashFileSearch} from 'test-files-rx'
import {getSubscriber} from './test-helpers'

export const fileSet = {
  localFiles: [
    'tmp.txt',
    'a/1/one.txt',
    'a/2/two.txt',
    'a/3/three.txt'
  ],
  rootPath: '/tmp/fs-test',
  localPath: join(__dirname, '..', 'fs-test')
}

function localFileName (name) {
  return join(fileSet.localPath, name)
}

fdescribe('rimrafRx', () => {
  beforeEach((done) => {
    buildFileSet(fileSet).subscribe(getSubscriber(done))
  })

  it('should delete all files in the path', (done) => {
    rimrafRx(localFileName('**/*'))
      .mergeMap(() => bashFileSearch('**/*', fileSet.localPath))
      .do((fileList) => {
        expect(fileList).toEqual({
          pattern: '**/*',
          matches: []
        })
      })
      .subscribe(getSubscriber(done))
  })

  it('should return an empty object', (done) => {
    rimrafRx(localFileName('**/*'))
      .do((result) => {
        expect(typeof result).toEqual('object')
        expect(result).toEqual({})
      })
      .subscribe(getSubscriber(done))
  })
})
