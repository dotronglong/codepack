import Route from './route'

export default class Router {
  constructor(routes = {}) {
    this.routes = routes
  }

  add(route) {
    if (typeof route !== 'object') {
      throw new Error('[Router::addRoute] route must be an object')
    }

    if (!(route instanceof Route)) {
      route = Route.from(route)
    }

    this.routes[route.name] = route
  }

  has(name) {
    return typeof this.routes[name] !== 'undefined'
  }

  remove(name) {
    if (this.has(name)) {
      delete this.routes[name]
    }
  }
}