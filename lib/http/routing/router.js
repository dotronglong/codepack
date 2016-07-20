import Bag from '../bag'
import Route from './route'

export default class Router {
  constructor(routes = {}) {
    this.routes = routes
  }

  addRoute(route) {
    if (typeof route !== 'object') {
      throw new Error('[Router::addRoute] route must be an object')
    }

    if (!(route instanceof Route)) {
      route = Route.from(route)
    }

    this.routes[route.name] = route
  }
}