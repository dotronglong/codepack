var expect = require('chai').expect
import Header from '../../lib/http/header'

/** @test {Header} */
describe('http/header.js', () => {
  const data  = {
    'content-Type': 'application/json',
    'Cache-control': 'no-cache'
  }
  let headers
  beforeEach(() => {
    headers = new Header(data)
  })

  /** @test {Header.keys} */
  it('[get keys] should return keys in upperCase format', () => {
    expect(headers.keys).to.deep.equal(['Content-Type', 'Cache-Control'])
  })

  /** @test {Header#has} */
  it('[has] should return true', () => {
    expect(headers.has('CONTENT-TYPE')).to.be.true
  })

  /** @test {Header#get} */
  it('[get] should return application/json, and no-cache', () => {
    expect(headers.get('CONTENT-type')).to.equal('application/json')
    expect(headers.get('cache-CONTRol')).to.equal('no-cache')
  })

  /** @test {Header#set} */
  it('[set] should set a key in lowercase with value', () => {
    headers.set('soMe-KEY', true)
    expect(headers.get('some-key')).to.be.true
  })

  /** @test {Header#set} */
  it('[set] should set a key in lowercase with value', () => {
    headers.set('soMe-KEY', true)
    expect(headers.get('some-key')).to.be.true
    headers.delete('soMe-KEY')
    expect(headers.get('some-key')).to.be.null
  })
})
