import {Plugin} from "../app"
import RequestEvent from "../http/event/request"
import Listener from "../event/listener"

class RequestListener extends Listener {
  constructor() {
    super(() => {
      
    }, Listener.PRIORITY_HIGH)
  }
}

export default class HandlerPlugin extends Plugin {
  onBoot() {
    this.app.events.subscribe(RequestEvent.NAME, new RequestListener())
  }
}
