import Route from "./route"
import Request from "../request"
import Bag from "../../bag"

/**
 * Router
 *
 * Manage and route request
 */
export default class Router extends Bag {
  /**
   * Constructor
   * @param {Route[]} routes
   */
  constructor(routes = []) {
    super()
    if (routes.length) {
      routes.forEach(route => this.add(route))
    }
  }

  /**
   * Add a route
   * @param {Object|Route} route
   */
  add(route) {
    if (typeof route !== "object") {
      throw new Error("[Router#add] route must be an object")
    }

    if (!(route instanceof Route)) {
      route = Route.from(route)
    }

    this.set(route.name, route)
  }

  /**
   * An alias of delete method
   * @param {string} name
   */
  remove(name) {
    this.delete(name)
  }

  /**
   * Route the request to find out the matching route
   * @param {Request} request
   * @returns {Route|null} Return the matched route or null if there is no appropriate routes
   */
  route(request) {
    if (!(request instanceof Request)) {
      throw new Error("[Router#route] request must be an instance of Http/Request")
    }

    for (let [name, route] of this) {
      if (route.match(request)) {
        request.params = Object.assign(route.params, route.matches)
        return route
      }
    }

    return null
  }
}