import Request from "../http/request"
import Response from "../http/response"
import Connection from "../http/connection"
import {Plugin} from "../app"
import RequestEvent from "../http/event/request"

const HEADER_HOST = "host"

export default class KernelPlugin extends Plugin {
  onBoot() {
    this.app.servers.forEach(server => this.setUpServer(server))
  }

  /**
   * Set up the server, connection and finally emit RequestEvent
   * @param {Server} server
   */
  setUpServer(server) {
    server.kernel.on("request", (req, res) => {
      let connection = this.setUpConnection(req, res, server)
      this.app.events.emit(new RequestEvent(connection))
    })
  }

  setUpRequest(resource) {
    let request      = new Request()
    request.resource = resource
    request.headers  = resource.headers
    request.method   = resource.method
    request.path     = resource.url

    let host    = request.headers.get(HEADER_HOST)
    let matches = host.match(/^([\w\.-]+):?(\d+)?$/i)
    if (matches !== null) {
      request.host = matches[1]
      if (matches[2] !== undefined) {
        request.port = matches[2]
      }
    }

    return request
  }

  setUpResponse(res) {
    let response      = new Response()
    response.resource = res
    return response
  }

  setUpConnection(req, res, server) {
    let request  = this.setUpRequest(req),
        response = this.setUpResponse(res)
    return new Connection(request, response, server)
  }
}
