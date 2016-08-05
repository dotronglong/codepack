import Request from '../http/request'
import Response from '../http/response'
import Connection from '../http/connection'
import Plugin from '../plugin'
import RequestEvent from '../http/event/request'

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
    let request = new Request()
    request.server = {
      host: ''
    }
    return request
  }

  setUpResponse(res) {
    let response = new Response()
    return response
  }

  setUpConnection(req, res) {
    let request  = this.setUpRequest(req),
        response = this.setUpResponse(res)
    return new Connection(request, response)
  }
}