/* eslint-env jasmine */

import {join} from 'path'
import {statSync, lstatSync} from 'fs'
import {statRx, lstatRx} from '../src/stat-file'
import {buildFileSet} from 'test-files-rx'
import {getSubscriber} from './test-helpers'
import _omit from 'lodash/omit'

export const fileSet = {
  localFiles: [
    'tmp.txt',
    'a/one.txt'
  ],
  symLinks: [
    [ 'a/symlink/a/b/c', 'a/symlink' ]
  ],
  rootPath: '/tmp/fs-test',
  localPath: join(__dirname, '..', 'fs-test')
}

function localFileName (name) {
  return join(fileSet.localPath, name)
}

// AppVeyor work-around
const getStats = (stats) => _omit(stats, ['dev'])

describe('statRx', () => {
  beforeEach((done) => {
    buildFileSet(fileSet).subscribe(getSubscriber(done))
  })

  it('should get stats for file', (done) => {
    const fileName = localFileName('tmp.txt')
    statRx(fileName)
      .do((info) => {
        expect(typeof info).toEqual('object')
        expect(info.stats.isFile()).toBe(true)
      })
      .subscribe(getSubscriber(done))
  })

  it('should get null stats for non-existent file', (done) => {
    const fileName = localFileName('tmp-missing.txt')
    statRx(fileName)
      .do((info) => {
        expect(typeof info).toEqual('object')
        expect(info.stats).toBe(null)
      })
      .subscribe(getSubscriber(done))
  })

  it('should get stats for directory', (done) => {
    const fileName = localFileName('a')
    statRx(fileName)
      .do((info) => {
        expect(typeof info).toEqual('object')
        expect(info.stats.isDirectory()).toBe(true)
      })
      .subscribe(getSubscriber(done))
  })

  it('should get stats for symlink', (done) => {
    const fileName = localFileName('a/symlink/a/b/c')
    statRx(fileName)
      .do((info) => {
        expect(typeof info).toEqual('object')
        expect(info.stats.isSymbolicLink()).toBe(false)
      })
      .subscribe(getSubscriber(done))
  })

  it('should return the file info object', (done) => {
    const fileInfo = {
      basedir: fileSet.localPath,
      name: 'tmp.txt'
    }
    statRx(fileInfo)
      .do((info) => {
        expect(typeof info).toEqual('object')
        expect(_omit(info, ['stats'])).toEqual({
          basedir: fileSet.localPath,
          name: 'tmp.txt'
        })
        expect(getStats(info.stats)).toEqual(
          getStats(statSync(localFileName('tmp.txt')))
        )
      })
      .subscribe(getSubscriber(done))
  })
})

describe('lstatRx', () => {
  beforeEach((done) => {
    buildFileSet(fileSet).subscribe(getSubscriber(done))
  })

  it('should get stats for file', (done) => {
    const fileName = localFileName('tmp.txt')
    lstatRx(fileName)
      .do((info) => {
        expect(typeof info).toEqual('object')
        expect(info.stats.isFile()).toBe(true)
      })
      .subscribe(getSubscriber(done))
  })

  it('should get null stats for non-existent file', (done) => {
    const fileName = localFileName('tmp-missing.txt')
    lstatRx(fileName)
      .do((info) => {
        expect(typeof info).toEqual('object')
        expect(info.stats).toBe(null)
      })
      .subscribe(getSubscriber(done))
  })

  it('should get stats for directory', (done) => {
    const fileName = localFileName('a')
    lstatRx(fileName)
      .do((info) => {
        expect(typeof info).toEqual('object')
        expect(info.stats.isDirectory()).toBe(true)
      })
      .subscribe(getSubscriber(done))
  })

  it('should get stats for symlink', (done) => {
    const fileName = localFileName('a/symlink/a/b/c')
    lstatRx(fileName)
      .do((info) => {
        expect(typeof info).toEqual('object')
        expect(info.stats.isSymbolicLink()).toBe(true)
      })
      .subscribe(getSubscriber(done))
  })

  it('should return the file info object', (done) => {
    const fileInfo = {
      basedir: fileSet.localPath,
      name: 'tmp.txt'
    }
    lstatRx(fileInfo)
      .do((info) => {
        expect(typeof info).toEqual('object')
        expect(_omit(info, ['stats'])).toEqual({
          basedir: fileSet.localPath,
          name: 'tmp.txt'
        })
        expect(getStats(info.stats)).toEqual(
          getStats(lstatSync(localFileName('tmp.txt')))
        )
      })
      .subscribe(getSubscriber(done))
  })
})
