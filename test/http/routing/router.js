import Router from '../../../lib/http/routing/router'
import Route from '../../../lib/http/routing/route'
import Request from '../../../lib/http/request'
import Bag from '../../../lib/bag'
var expect = require('chai').expect

describe('http/routing/router.js', () => {
  let router, route, name, path
  beforeEach(() => {
    name = 'home'
    path = '/my-path'
    router = new Router()
    route = new Route(name, Request.METHOD_POST, path)
  })

  it('[add] should allow to add a new route', () => {
    expect(Object.keys(router.routes).length).to.equal(0)
    router.add(route)
    expect(Object.keys(router.routes).length).to.equal(1)

    router.add({name: 'another'})
    expect(Object.keys(router.routes).length).to.equal(2)
  })

  it('[has] should return false at first, and true on latter call', () => {
    expect(router.has(name)).to.be.false
    router.add(route)
    expect(router.has(name)).to.be.true
  })

  it('[remove] should a specific route by name', () => {
    router.add(route)
    expect(router.has(name)).to.be.true
    router.remove(name)
    expect(router.has(name)).to.be.false
  })
})