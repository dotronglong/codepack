import Request from './request'
import Response from './response'
import Bag from '../bag'
var http = require('http')
var os = require('os')

export default class Server {
  constructor(options = {}) {
    this.options  = new Bag(options)
    this.server   = null
    this.request  = null
    this.response = null
  }

  start(cb) {
    return new Promise((resolve, reject) => {
      const port  = this.options.get(Server.OPTION_PORT, Server.DEFAULT_PORT)
        , host    = this.options.get(Server.OPTION_HOST, Server.DEFAULT_HOST)
        , backlog = this.options.get(Server.OPTION_BACKLOG, Server.DEFAULT_BACKLOG)
      this.info = {
        host: host,
        port: port,
        backlog: backlog,
        url: `http://${host === null ? os.hostname() : host}:${port}`
      }
      this.server = http.createServer(function (req, res) {
        Promise.all([Request.from(req), Response.from(res)])
          .then(([request, response]) => {
            resolve(request, response)
          })
          .catch((e) => {reject(e)})
      }).listen(port, host, backlog, cb)
    })
  }
}
Server.DEFAULT_BACKLOG = 511
Server.DEFAULT_PORT    = 3000
Server.DEFAULT_HOST    = null
Server.OPTION_PORT     = 'port'
Server.OPTION_HOST     = 'host'
Server.OPTION_BACKLOG  = 'backlog'