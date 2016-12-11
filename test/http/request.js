import Bag from '../../lib/bag'
import Request from '../../lib/http/request'
var expect = require('chai').expect
var url = require('url')

/** @test {Request} */
describe('http/request.js',() => {
  let request
  beforeEach(() => {
    request = new Request()
  })

  /** @test {Request.setQuery} */
  it('[setQuery] should allow to set query', () => {
    // set query as a string
    let str = 'sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=cookie%20nodejs'
    request.setQuery(str)
    expect(parseInt(request.getQuery().get('ion'))).to.equal(1)

    let uri = `https://www.google.com.vn/webhp?${str}`
    request.setQuery(url.parse(uri, true, true).query)
    expect(parseInt(request.getQuery().get('ion'))).to.equal(1)

    request.setQuery({ion: 2})
    expect(parseInt(request.getQuery().get('ion'))).to.equal(2)
  })

  /** @test {Request.getQuery} */
  it('[getQuery] should return an instance of Bag', () => {
    expect(request.getQuery()).to.be.an.instanceof(Bag)
  })

  /** @test {Request.getServer} */
  it('[getServer] should return an instance of Bag', () => {
    expect(request.getServer()).to.be.an.instanceof(Bag)
  })

  /** @test {Request.setServer} */
  it('[setServer] should allow to set some properties', () => {
    try {
      request.setServer('some-string')
    } catch (e) {
      expect(e).to.be.an.instanceof(Error)
    }

    const data = {some_value: true}
    request.setServer(data)
    expect(request.getServer().all()).to.deep.equal(data)
  })

  /** @test {Request.getClient} */
  it('[getClient] should return an instance of Bag', () => {
    expect(request.getClient()).to.be.an.instanceof(Bag)
  })

  /** @test {Request.setClient} */
  it('[set client] should allow to set some properties', () => {
    try {
      request.setClient('some-string')
    } catch (e) {
      expect(e).to.be.an.instanceof(Error)
    }

    const data = {some_value: true}
    request.setClient(data)
    expect(request.getClient().all()).to.deep.equal(data)
  })
})
