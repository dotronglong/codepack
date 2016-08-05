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
    expect(httpServer.kernel instanceof http.Server).to.be.true
    expect(httpsServer.kernel instanceof https.Server).to.be.true
  })

  it('[start] should start server correctly', () => {
    httpServer.port = 3333
    httpServer.callback = () => {
    httpServer.kernel.on('request', (req) => {console.log(req)})
      const port = httpServer.kernel.address().port
      // httpServer.close()
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