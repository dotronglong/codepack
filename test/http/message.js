var expect = require('chai').expect
import Message from '../../lib/http/message'

describe('http/message.js',() => {
  let message
  beforeEach(() => {
    message = new Message()
  })

  it('[getter:type] should return value of header content-type', () => {
    expect(message.type).to.equal(Message.CONTENT_JSON)
    message.headers.set(Message.HEADER_CONTENT_TYPE, Message.CONTENT_TEXT)
    expect(message.type).to.equal(Message.CONTENT_TEXT)
  })
})