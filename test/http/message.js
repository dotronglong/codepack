var expect = require('chai').expect
import Message from '../../lib/http/message'

describe('http/message.js',() => {
  let message, body
  beforeEach(() => {
    message = new Message()
    body = new Message.Body()
  })

  it('[getter::type] should return value of header content-type', () => {
    expect(message.type).to.equal(Message.CONTENT_JSON)
    message.headers.set(Message.HEADER_CONTENT_TYPE, Message.CONTENT_TEXT)
    expect(message.type).to.equal(Message.CONTENT_TEXT)
  })

  it('[body -> toString] should return string', () => {
    expect(typeof body.toString()).to.equal('string')
  })

  it('[body -> content] should return an object', () => {
    expect(typeof body.content).to.equal('object')
  })

  it('[body setter::content] should parse JSON content', () => {
    let data = {a: 'Hello', b: 'World'}
    body.content = data
    expect(body.content).to.deep.equal(data)
    expect(body.toString()).to.equal(JSON.stringify(data))

    data = JSON.stringify(data)
    expect(body.content).to.deep.equal(JSON.parse(data))
    expect(body.toString()).to.equal(data)
  })
})