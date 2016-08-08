import Request from '../http/request'
import Response from '../http/response'
import Connection from '../http/connection'
import Plugin from '../plugin'
import RequestEvent from '../http/event/request'

const HEADER_HOST         = 'host'

export default class Kernel extends Plugin {
  onBoot() {
    this.app.servers.forEach(server => this.setUpServer(server))
  }

  setUpServer(server) {
    server.kernel.on('request', (req, res) => {
      let connection = this.setUpConnection(req, res),
          event      = new RequestEvent(connection)
      this.app.events.emit(event)
    })
  }

  setUpRequest(req) {
    let request      = new Request()
    request.resource = req
    request.headers  = req.headers
    request.method   = req.method
    request.path     = req.url

    this.setUpRequestHost(request)

    return request
  }

  setUpRequestHost(request) {
    let host    = request.headers.get(HEADER_HOST)
    let matches = host.match(/^(\w+):?(\d+)?$/i)
    if (matches !== null) {
      request.host = matches[1]
      if (typeof matches[2] !== 'undefined') {
        request.port = matches[2]
      }
    }
  }

  setUpResponse(res) {
    let response      = new Response()
    response.resource = res
    return response
  }

  setUpConnection(req, res) {
    let request  = this.setUpRequest(req),
        response = this.setUpResponse(res)
    return new Connection(request, response)
  }
}