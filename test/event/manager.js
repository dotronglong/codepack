import Event from '../../lib/event/event'
import EventManager from '../../lib/event/manager'
var expect = require('chai').expect

describe('event/manager.js', () => {
  let em, event, name = 'event_name', func = (e, done) => {done()}
  beforeEach(() => {
    em = new EventManager()
    event = new Event(name)
  })

  // it('[on] should allow to register an event listener', () => {
  //   expect(em.events).to.deep.equal({})
  //   em.on(name, func)
  //   expect(em.events[name].listeners.length).to.equal(1)
  //   expect(em.events[name].sorted).to.be.false
  // })
  //
  // it('[has] should return false, and true in the latter use', () => {
  //   expect(em.has(name)).to.be.false
  //   em.on(name, func)
  //   expect(em.has(name)).to.be.true
  // })
  //
  // it('[get] should return an event item', () => {
  //   em.on(name, func)
  //   let item = em.get(name)
  //   expect(item.listeners.length).to.equal(1)
  // })
  //
  // it('[fire] should ring the bell', () => {
  //   let bell = {ring: false}
  //   em.on(name, (e) => {e.bell.ring = true})
  //   event.bell = bell
  //   em.emit(event)
  //   expect(bell.ring).to.be.true
  // })
  //
  // it('[fire] run in parallel', () => {
  //   event.parallel = true
  //   event.tasks = []
  //   em.on(name, (e, done) => {
  //     setTimeout(() => {
  //       e.tasks.push(300);
  //       done()
  //     }, 50)
  //   }).done((e) => {
  //     expect(e.tasks).to.deep.equal([100, 300])
  //   })
  //
  //   em.once(name, (e, done) => {
  //     e.tasks.push(100)
  //     done()
  //   })
  //
  //   em.emit(event)
  // })
  //
  // it('[fire] run in series', () => {
  //   event.parallel = false
  //   event.tasks = []
  //   em.on(name, (e, done) => {
  //     setTimeout(() => {
  //       e.tasks.push(300);
  //       done()
  //     }, 150)
  //   }).done((e) => {
  //     expect(e.tasks).to.deep.equal([300, 100])
  //   })
  //
  //   em.once(name, (e, done) => {
  //     setTimeout(() => {
  //       e.tasks.push(100);
  //       done()
  //     }, 50)
  //   })
  //
  //   em.emit(event)
  // })

  it('[once] should register listener to run at once', () => {
    em.once(name, func)
    expect(em.events[name].listeners.length).to.equal(1)
    em.emit(event)
    expect(em.events[name].listeners.length).to.equal(0)
  })

  it('[twice] should register listener to run twice', () => {
    em.twice(name, func)
    expect(em.events[name].listeners.length).to.equal(1)
    em.emit(event)
    expect(em.events[name].listeners.length).to.equal(1)
    em.emit(event)
    expect(em.events[name].listeners.length).to.equal(0)
  })
})