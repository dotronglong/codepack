import Request from './request'
import Response from './response'
import Connection from './connection'
import Bag from '../bag'
var http = require('http')
var os   = require('os')

export default class Server {
  constructor(options = {}) {
    this.options  = new Bag(options)
    this.instance = null
    this.request  = null
    this.response = null
  }

  start(handleConnection, handleError) {
    return new Promise((resolve, reject) => {
      const port    = this.options.get(Server.OPTION_PORT, Server.DEFAULT_PORT),
            host    = this.options.get(Server.OPTION_HOST, Server.DEFAULT_HOST),
            backlog = this.options.get(Server.OPTION_BACKLOG, Server.DEFAULT_BACKLOG)
      this.info     = {
        host: host,
        port: port,
        backlog: backlog,
        url: `http://${host === null ? os.hostname() : host}:${port}`
      }
      this.instance = http.createServer(function (req, res) {
        Promise.all([Request.from(req), Response.from(res)])
          .then(([request, response]) => {
            handleConnection(new Connection(request, response))
          })
          .catch(e => handleError(e))
      }).listen(port, host, backlog, resolve)
    })
  }
}
Server.DEFAULT_BACKLOG = 511
Server.DEFAULT_PORT    = 3333
Server.DEFAULT_HOST    = null
Server.OPTION_PORT     = 'port'
Server.OPTION_HOST     = 'host'
Server.OPTION_BACKLOG  = 'backlog'