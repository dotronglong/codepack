var expect = require('chai').expect
import Bag from '../../lib/bag'
import Request from '../../lib/http/request'
var url = require('url')

describe('http/request.js',() => {
  let request
  beforeEach(() => {
    request = new Request()
  })

  it('[setter::query] should allow to set query', () => {
    // set query as a string
    let str = 'sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=cookie%20nodejs'
    request.query = str
    expect(parseInt(request.query.get('ion'))).to.equal(1)

    let uri = `https://www.google.com.vn/webhp?${str}`
    request.query = url.parse(uri, true, true).query
    expect(parseInt(request.query.get('ion'))).to.equal(1)

    request.query = {ion: 2}
    expect(parseInt(request.query.get('ion'))).to.equal(2)
  })

  it('[getter::query] should return an instance of Bag', () => {
    expect(request.query instanceof Bag).to.be.true
  })
})