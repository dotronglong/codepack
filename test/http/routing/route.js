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
    route.path = '/accounts/{id}-{name}'
    route.demands = {
      // id: /\d+/,
      name: '[a-zA-Z]'
    }
    route.preMatch()
    // console.log(route.params, route.path)
  })
})