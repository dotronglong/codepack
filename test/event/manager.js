import Event from '../../lib/event/event'
import EventManager from '../../lib/event/manager'
var expect = require('chai').expect

describe('event/manager.js', () => {
  let em, event, name = 'event_name', func = () => {}
  beforeEach(() => {
    em = new EventManager()
    event = new Event(name)
  })

  it('[on] should allow to register an event listener', () => {
    expect(em.events).to.deep.equal({})
    em.on(name, func)
    expect(em.events[name].listeners.length).to.equal(1)
    expect(em.events[name].sorted).to.be.false
  })

  it('[has] should return false, and true in the latter use', () => {
    expect(em.has(name)).to.be.false
    em.on(name, func)
    expect(em.has(name)).to.be.true
  })

  it('[get] should return an event item', () => {
    em.on(name, func)
    let item = em.get(name)
    expect(item.listeners.length).to.equal(1)
  })

  // it('[fire] should ring the bell', () => {
  //   let bell = {ring: false}
  //   em.on(name, (e) => {e.bell.ring = true})
  //   event.bell = bell
  //   em.fire(name, event)
  //   expect(bell.ring).to.be.true
  // })

  it('[fire] run in parallel', () => {
    event.parallel = true
    event.tasks = []
    em.on(name, (e, done) => {
      setTimeout(() => {
        e.tasks.push(300)
        done()
      }, 300)
    }).done((e) => {
      console.log(300)
    })
    em.once(name, (e, done) => {
      setTimeout(() => {
        e.tasks.push(100)
        done()
      }, 100)
    }).done((e) => {
      console.log(100)
    })

    em.fire(event)
    em.fire(event)
  })

  // it('[once] should register listener to run at once', () => {
  //   em.once(name, func)
  //   expect(em.events[name].listeners.length).to.equal(1)
  //   em.fire(name, event)
  //   expect(em.events[name].listeners.length).to.equal(0)
  // })
  //
  // it('[twice] should register listener to run twice', () => {
  //   em.twice(name, func)
  //   expect(em.events[name].listeners.length).to.equal(1)
  //   em.fire(name, event)
  //   expect(em.events[name].listeners.length).to.equal(1)
  //   em.fire(name, event)
  //   expect(em.events[name].listeners.length).to.equal(0)
  // })
})