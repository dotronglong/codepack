import Router from '../../../lib/http/routing/router'
import Route from '../../../lib/http/routing/route'
import Request from '../../../lib/http/request'
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
  
  it('[route] should return appropriate route', () => {
    let request = new Request()
    request.server.host = 'vn.domain.com'
    request.path = '/accounts/1988-longdo'
    let route_1 = Route.from({
      name: 'user_account_id',
      host: '{country}.domain.com',
      path: '/accounts/{id}',
      demands: {
        id: /\d+/
      }
    })
    let route_2 = Route.from({
      name: 'user_account_name',
      host: '{country}.domain.com',
      path: '/accounts/{id}-{name}',
      demands: {
        id: /\d+/
      }
    })
    router.add(route_1)
    router.add(route_2)
    route = router.route(request)
    expect(route.name).to.equal('user_account_name')
    expect(route.matches).to.deep.equal({
      country: 'vn',
      id: '1988',
      name: 'longdo'
    })
  })
})