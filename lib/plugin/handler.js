import Request from "../http/request"
import Response from "../http/response"
import Connection from "../http/connection"
import App from "../app"
import RequestEvent from "../http/event/request"
import Listener from "../event/listener"

class RequestListener extends Listener {
  constructor() {
    super(() => {
      
    }, Listener.PRIORITY_HIGH)
  }
}

export default class HandlerPlugin extends App.Plugin {
  onBoot() {
    this.app.events.subscribe(Request)
  }
}
