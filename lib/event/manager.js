import Listener from './listener'
import Event from './event'
import async from 'async'

function onAsyncCompleted(event, err) {
  let listeners = this.events[event.name].listeners
  const total   = listeners.length
  for (let i = 0; i < total; i++) {
    let listener = listeners[i]

    if (listener.limit !== Listener.LIMIT_NONE) {
      // reduce listener limit
      this.events[event.name].listeners[i].limit--
    }

    if (err === null && typeof listener.cbDone === 'function') {
      listener.cbDone(event)
    } else if (err !== null && typeof listener.cbError === 'function') {
      if (typeof err === 'string') {
        event.exception = new Error(err)
      } else {
        event.exception = err
      }
      listener.cbError(event)
    }

    if (listener.limit === 0) {
      // remove this listener
      removeEventListener.apply(this, [event.name, i])
    }
  }
}
const getEventItem = (listeners = [], sorted = false) => {
  return {
    listeners: listeners,
    sorted: sorted
  }
}
function removeEventListener(name, position) {
  this.events[name].listeners.splice(position, 1)
}

export default class EventManager {
  constructor() {
    this.events = {}
  }

  /**
   * Subscribe a listener to Event Manager
   *
   * @param {string} name
   * @param {Listener} listener
   */
  subscribe(name, listener) {
    if (!(listener instanceof Listener)) {
      throw new Error('[Event:subscribe] listener must be an instance of Event/Listener')
    }
    return this.on(name, listener.runner, listener.priority, listener.limit)
  }

  unsubscribe(name, listener) {
    if (!(listener instanceof Listener)) {
      throw new Error('[Event:subscribe] listener must be an instance of Event/Listener')
    }
    return this.off(name, listener.priority)
  }

  /**
   * Bind a listener to event by name
   *
   * @param {string} name
   * @param {function|callable} runner
   * @param {int} priority
   * @returns {Listener}
   */
  on(name, runner, priority, limit) {
    if (!this.has(name)) {
      this.events[name] = getEventItem()
    }

    let listener = new Listener(runner, priority, limit)
    this.events[name].listeners.push(listener)

    return listener
  }

  once(name, runner, priority) {
    return this.on(name, runner, priority, Listener.LIMIT_ONCE)
  }

  twice(name, runner, priority) {
    return this.on(name, runner, priority, Listener.LIMIT_TWICE)
  }

  off(name, priority) {
    if (typeof priority === 'undefined') {
      // remove all listeners of event's name
      this.events[name] = getEventItem()
    } else if (this.has(name)) {
      let listeners = this.get(name).listeners
      for (let i = 0; i < listeners.length; i++) {
        let listener = listeners[i]
        if (listener.priority === priority) {
          removeEventListener.apply(this, [name, i])
        }
      }
    } else {
      throw new Error('[Event:off] event\'s name must be specified.')
    }
  }

  /**
   * Sort event listeners by priority
   *
   * @param {string} name
   * @param {string} type
   */
  sort(name, type = EventManager.SORT_ASCENDING) {
    if (this.get(name).sorted) {
      return
    }

    const total = this.events[name].listeners.length
    let pos, guard, listener, temporary
    for (let i = 0; i < total - 1; i++) {
      pos = i
      for (let j = i + 1; j < total; j++) {
        guard    = this.events[name].listeners[pos]
        listener = this.events[name].listeners[j]
        if (type === EventManager.SORT_ASCENDING && guard.priority > listener.priority
          || type === EventManager.SORT_DESCENDING && guard.priority < listener.priority) {
          pos = j
        }
      }

      if (i !== pos) {
        temporary                        = this.events[name].listeners[i]
        this.events[name].listeners[i]   = this.events[name].listeners[pos]
        this.events[name].listeners[pos] = temporary
      }
    }
  }

  /**
   * Check whether event's name has been registered yet
   *
   * @param {string} name
   * @returns {boolean}
   */
  has(name) {
    return typeof this.events[name] === 'object'
  }

  /**
   * Get event item
   *
   * @param string name
   * @returns {{listeners, sorted}}
   */
  get(name) {
    return this.has(name) ? this.events[name] : getEventItem([], true)
  }

  /**
   * Emit an event
   *
   * @param {string} name
   * @param {Event} event
   * @throws Error An error exception will be thrown when event is not an instance of Event
   */
  emit(event) {
    if (!(event instanceof Event)) {
      throw new Error(`[Event::emit] event must be an instance of Event`)
    }
    const name = event.name
    this.sort(name)

    let listeners = this.get(name).listeners
    const total   = listeners.length
    let parallels = []
    for (let i = 0; i < total; i++) {
      parallels.push((done) => listeners[i].runner(event, done))
    }

    // run tasks
    if (parallels.length) {
      if (event.parallel === true) {
        async.parallel(parallels, (err, results) => {
          onAsyncCompleted.apply(this, [event, err, results])
        })
      } else {
        async.series(parallels, (err, results) => {
          onAsyncCompleted.apply(this, [event, err, results])
        })
      }
    }
  }
}