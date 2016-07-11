import Bag from '../../lib/bag'
import Message from '../../lib/http/message'
var expect = require('chai').expect

describe('http/message.js', () => {
  let message = new Message()
  beforeEach(() => {
    message = new Message()
  })

  it('[headers] should be an instance of Bag', () => {
    expect(message.headers instanceof Bag).to.be.true
  })
})