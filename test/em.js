import EventManager from '../lib/em'
var expect = require('chai').expect

describe('em.js', () => {
  let events = new EventManager()
  beforeEach(() => {
    events = new EventManager()
  })

  it('[has] should return false in first call, and true in latter call', () => {
    expect(events.has('name')).to.be.false
    events.on('name', () => {})
    expect(events.has('name')).to.be.true
  })
  it('[get] should return 2 listeners', () => {
    events.on('name', () => {})
    events.on('name', () => {})
    expect(events.get('name').length).to.equal(2)
  })
  it('[on] should allow to add a listener', () => {
    expect(events.get('name').length).to.equal(0)
    events.on('name', () => {})
    expect(events.get('name').length).to.equal(1)
  })
  it('[off] should allow to remove all listeners or a listener with specific priority', () => {
    events.on('name', () => {})
    events.on('name', () => {}, EventManager.PRIORITY_HIGHER)
    events.off('name')
    expect(events.get('name').length).to.equal(0)

    events.on('name', () => {})
    events.on('name', () => {}, EventManager.PRIORITY_HIGHER)
    events.off('name', EventManager.PRIORITY_HIGHER)
    expect(events.get('name').length).to.equal(1)
  })
  it('[sort] should allow to sort listeners by priority in ascending and descending', () => {
    events.on('name', () => {}, EventManager.PRIORITY_LEAST)
    events.on('name', () => {}, EventManager.PRIORITY_HIGHER)
    events.on('name', () => {}, EventManager.PRIORITY_NORMAL)

    events.sort('name', EventManager.SORT_ASCENDING)
    let listeners = events.get('name')
    expect(listeners[0].priority).to.equal(EventManager.PRIORITY_LEAST)
    expect(listeners[1].priority).to.equal(EventManager.PRIORITY_NORMAL)
    expect(listeners[2].priority).to.equal(EventManager.PRIORITY_HIGHER)

    events.sort('name', EventManager.SORT_DESCENDING)
    listeners = events.get('name')
    expect(listeners[0].priority).to.equal(EventManager.PRIORITY_HIGHER)
    expect(listeners[1].priority).to.equal(EventManager.PRIORITY_NORMAL)
    expect(listeners[2].priority).to.equal(EventManager.PRIORITY_LEAST)
  })
  it('[fire] should fire all listeners', () => {
    let o = {text: 'I'}
    events.on('name', (obj) => {obj.text += ' am'}, EventManager.PRIORITY_LEAST)
    events.on('name', (obj) => {obj.text += ' runner'}, EventManager.PRIORITY_HIGHER)
    events.on('name', (obj) => {obj.text += ' a'}, EventManager.PRIORITY_NORMAL)
    events.fire('name', o)
    expect(o.text).to.equal('I am a runner')
  })
})