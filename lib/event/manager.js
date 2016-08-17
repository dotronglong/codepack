import Listener from "./listener"
import Event from "./event"
import async from "async"

/**
 * Handle event when asynchronous calls have been completed
 * @param {Event} event Current running event
 * @param {string} err A string represent for error
 */
function onAsyncCompleted(event, err) {
  let listeners = this.events[event.name].listeners
  const total   = listeners.length
  for (let i = 0; i < total; i++) {
    let listener = listeners[i]

    if (listener.limit !== Listener.LIMIT_NONE) {
      // reduce listener limit
      this.events[event.name].listeners[i].limit--
    }

    if (err === null && typeof listener.cbDone === "function") {
      listener.cbDone(event)
    } else if (err !== null && typeof listener.cbError === "function") {
      if (typeof err === "string") {
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

/**
 * Get structure of an event item
 * @param {Array} listeners
 * @param {boolean} sorted
 * @returns {{listeners: Array, sorted: boolean}}
 */
const getEventItem = (listeners = [], sorted = false) => {
  return {
    listeners: listeners,
    sorted: sorted
  }
}

/**
 * Remove a listener by name and position
 * @param {string} name Name of event
 * @param {number} position Position of the listener in queue
 */
function removeEventListener(name, position) {
  this.events[name].listeners.splice(position, 1)
}

/**
 * Manage, emit events
 */
export default class EventManager {
  /**
   * Constructor
   */
  constructor() {
    /**
     * @type {{}}
     */
    this.events = {}
  }

  /**
   * Subscribe a listener to Event Manager
   *
   * @param {!string} name Name of event to subscribe
   * @param {!Listener} listener A listener object to handle incoming event
   */
  subscribe(name, listener) {
    if (!(listener instanceof Listener)) {
      throw new Error("[Event:subscribe] listener must be an instance of Event/Listener")
    }
    this.on(name, listener.runner, listener.priority, listener.limit)
  }

  /**
   * Unsubsribe a listener
   *
   * @param {!string} name Name of event to unsubscribe
   * @param {!Listener} listener Listener to unsubscribe
   */
  unsubscribe(name, listener) {
    if (!(listener instanceof Listener)) {
      throw new Error("[Event:subscribe] listener must be an instance of Event/Listener")
    }
    this.off(name, listener.priority)
  }

  /**
   * Register an event handler
   *
   * @param {!string} name Name of event to listen
   * @param {!function} runner Callback to handle incoming event
   * @param {?number} priority Higher priority handler will be call later than the others
   * @param {?number} limit Number of times to be run. Default is null to ignore limit
   * @returns {Listener} Listener instance of registration
   */
  on(name, runner, priority, limit) {
    if (!this.has(name)) {
      this.events[name] = getEventItem()
    }

    let listener = new Listener(runner, priority, limit)
    this.events[name].listeners.push(listener)

    return listener
  }

  /**
   * Register an one time handler of a specific event
   *
   * @param {!string} name Name of event to listen
   * @param {!function} runner Callback to handle incoming event
   * @param {?number} priority Higher priority handler will be call later than the others
   * @returns {Listener} Listener instance of registration
   */
  once(name, runner, priority) {
    return this.on(name, runner, priority, Listener.LIMIT_ONCE)
  }

  /**
   * Register an twice times handler of a specific event
   *
   * @param {!string} name Name of event to listen
   * @param {!function} runner Callback to handle incoming event
   * @param {?number} priority Higher priority handler will be call later than the others
   * @returns {Listener} Listener instance of registration
   */
  twice(name, runner, priority) {
    return this.on(name, runner, priority, Listener.LIMIT_TWICE)
  }

  /**
   * Remove event's listeners
   *
   * @param {string} name Name of event to remove its listeners
   * @param {number} priority Priority of handler to remove. In case this parameter is undefined,
   *                          it will remove all handlers
   * @throws {Error} If name of event is not specified
   */
  off(name, priority) {
    if (typeof priority === "undefined") {
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
      throw new Error("[Event:off] event's name must be specified.")
    }
  }

  /**
   * Sort event listeners by priority
   * @see {EventManager.SORT_ASCENDING}
   * @param {!string} name Name of event to sort
   * @param {string} [type="asc"] Sorting type, asc (EventManager.SORT_ASCENDING) or desc (EventManager.SORT_DESCENDING)
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
   * Check whether or not event's name has been registered
   *
   * @param {string} name
   * @returns {Boolean}
   */
  has(name) {
    return typeof this.events[name] === "object"
  }

  /**
   * Get event's listeners for a specific event by name
   *
   * @param {string} name
   * @returns {{listeners: Array, sorted: boolean}} An object represents for event item
   */
  get(name) {
    return this.has(name) ? this.events[name] : getEventItem([], true)
  }

  /**
   * Emit (Fire) an event
   *
   * @param {Event} event Event to be fired
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
EventManager.SORT_ASCENDING  = "asc"
EventManager.SORT_DESCENDING = "desc"
