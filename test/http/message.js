var expect = require('chai').expect
import {Message, Body} from '../../lib/http/message'

/** @test {Message} */
describe('http/message.js',() => {
  let message, body
  beforeEach(() => {
    message = new Message()
    body = new Body()
  })

  /** @test {Message.type} */
  it('[getter::type] should return value of header content-type', () => {
    expect(message.type).to.equal(Message.CONTENT_JSON)
    message.headers.set(Message.HEADER_CONTENT_TYPE, Message.CONTENT_TEXT)
    expect(message.type).to.equal(Message.CONTENT_TEXT)
  })

  /** @test {Body#toString} */
  it('[body -> toString] should return string', () => {
    expect(typeof body.toString()).to.equal('string')
  })

  /** @test {Body.content} */
  it('[body -> content] should return an object', () => {
    expect(typeof body.content).to.equal('object')
  })

  /** @test {body#set content} */
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
