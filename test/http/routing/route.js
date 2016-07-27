import Route from '../../../lib/http/routing/route'
import Bag from '../../../lib/bag'
var expect = require('chai').expect

describe('http/routing/route.js', () => {
  let route
  beforeEach(() => {
    route = new Route()
  })

  it('[getter::options] should return an instance of Bag', () => {
    expect(route.options instanceof Bag).to.be.true
  })

  it('[setter::options] should allow to set options', () => {
    let options = {hello: 'World'}

    route.options = options
    expect(route.options.get('hello')).to.equal('World')

    options = new Bag(options)
    route.options = options
    expect(route.options.get('hello')).to.equal('World')
  })

  it('[preMatch] should perform pre-scanning for demands', () => {
    route.host = '{country}.domain.com'
    route.path = '/accounts/{id}-{name}'
    route.demands = {
      id: /\d+/,
      name: '[a-zA-Z]+',
      country: /^[a-z]{2}/
    }
    route.preMatch()
    expect(route.params).to.deep.equal({country: null, id: null, name: null})
  })

  it('[postMatch] should reset host, path', () => {
    route.reservedHost = 'sample'
    route.reservedPath = 'sample'
    route.postMatch()
    expect(route.host).to.equal('sample')
    expect(route.path).to.equal('sample')
    expect(route.reservedHost).to.be.null
    expect(route.reservedPath).to.be.null
  })

  it('[match] should return false at the first, and true in the latter', () => {
    route.host = '{country}.domain.com'
    route.path = '/accounts/{id}-{name}'
    route.demands = {
      id: /\d+/,
      name: '[a-zA-Z]+',
      country: /[a-z]{2}/
    }
    let path = '/accounts/1988-longdo'

    expect(route.match(path, 'vn1.domain.com')).to.be.false
    expect(route.params).to.deep.equal({id: '1988', name: 'longdo', country: null})

    route.demands.country = /^[a-z]{2}/
    expect(route.match(path, 'vn.domain.com')).to.be.true
    expect(route.params).to.deep.equal({id: '1988', name: 'longdo', country: 'vn'})
  })
})