import Server from '../../lib/http/server'
var expect = require('chai').expect
var http   = require('http')
var https  = require('https')

describe('http/server.js', () => {
  let httpServer, httpsServer
  beforeEach(() => {
    httpServer  = new Server.Http()
    httpsServer = new Server.Https()
  })

  it('[get server] should return appropriate server instance', () => {
    expect(httpServer.server instanceof http.Server).to.be.true
    expect(httpsServer.server instanceof https.Server).to.be.true
  })

  it('[start] should start server correctly', () => {
    httpServer.port = 3333
    httpServer.callback = () => {
      const port = httpServer.server.address().port
      httpServer.close()
      expect(port).to.equal(3333)
    }
    httpServer.start()
  })

  it('[is] should return true and false respectively', () => {
    httpServer.name = 'My_Server'
    expect(httpServer.is('My_Another_Server')).to.be.false
    expect(httpServer.is('My_Server')).to.be.true
  })
})