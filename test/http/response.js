var expect = require('chai').expect
import Response from '../../lib/http/response'

/** @test {Response} */
describe('http/response.js', () => {
  let response
  beforeEach(() => {
    response = new Response()
  })
  /** @test {Response#send} */

  it('[send] should send a response', () => {
    let resource = {
      statusCode: null,
      headers: {},
      end: function(content) {
        expect(content).to.equal(response.body.toString())
      },
      setHeader: function(key, value) {
        this.headers[key] = value
      }
    }
    response.resource = resource

    const content = 'Some content!',
          headers = {'Content-Type': 'application/json', 'Cache-Control': 'no-cache'},
          statusCode = 404

    response.send(content, statusCode, headers)
    expect(resource.statusCode).to.equal(statusCode)
    expect(resource.headers).to.deep.equal(headers)
  })
})
