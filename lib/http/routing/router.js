import Route from "./route"
import Request from "../request";

export default class Router {
  constructor(routes = {}) {
    this.routes = routes
  }

  add(route) {
    if (typeof route !== "object") {
      throw new Error("[Router::addRoute] route must be an object")
    }

    if (!(route instanceof Route)) {
      route = Route.from(route)
    }

    this.routes[route.name] = route
  }

  has(name) {
    return typeof this.routes[name] !== "undefined"
  }

  remove(name) {
    if (this.has(name)) {
      delete this.routes[name]
    }
  }
  
  get(name) {
    return this.has(name) ? this.routes[name] : null
  }

  route(request) {
    if (!(request instanceof Request)) {
      throw new Error("[Router::route] request must be an instance of Http/Request")
    }
    
    let names = Object.keys(this.routes)
    for (let i = 0; i < names.length; i++) {
      let route = this.get(names[i])
      if (route instanceof Route) {
        if (route.match(request)) {
          request.params = Object.assign(route.params, route.matches)
          return route
        }
      }
    }

    return null
  }
}