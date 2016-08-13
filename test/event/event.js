import Event from '../../lib/event/event'
var expect = require('chai').expect

/** @test {Event} */
describe('event/event.js', () => {
  let event = new Event()
  beforeEach(() => {event = new Event()})

  /** @test {Event#stop} */
  it('[stop] should stop the event by setting continue property to false', () => {
    expect(event.stopped).to.be.false
    event.stop()
    expect(event.stopped).to.be.true
  })

  /** @test {Event.stopped} */
  it('[stopped] should be false at the first and true in latter', () => {
    expect(event.stopped).to.be.false
    event.continue = false
    expect(event.stopped).to.be.true
  })
})
