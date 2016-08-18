import {Plugin} from "../app"
import RequestEvent from "../http/event/request"
import Listener from "../event/listener"

/**
 * Handle Routing
 * @param {Connection} connection
 * @param {Router} router
 */
const handleRoute = (connection, router) => {
  console.log(router.routes, connection.request.path)
  let route = router.route(connection.request)
  console.log(route)
  if (route) {
    connection.request.params = route.matches
    console.log(connection.request.params)
  }
}

class RequestListener extends Listener {
  constructor(router) {
    super((event) => {
      handleRoute(event.connection, router)
    }, Listener.PRIORITY_HIGH)
  }
}

export default class HandlerPlugin extends Plugin {
  onBoot() {
    this.app.events.subscribe(RequestEvent.NAME, new RequestListener(this.app.router))
  }
}
