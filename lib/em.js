class Listener {
  constructor(runner, priority) {
    this.runner   = runner
    this.priority = priority
  }
}

export default class EventManager {
  constructor() {
    this.listeners = {}
  }

  on(name, runner, priority = EventManager.PRIORITY_NORMAL) {
    if (!this.has(name)) {
      this.listeners[name] = []
    }

    const listener = new Listener(runner, priority)
    this.listeners[name].push(listener)
  }

  off(name, priority) {
    if (!this.has(name)) {
      return
    }

    if (typeof priority === 'undefined') {
      this.listeners[name] = []
    } else {
      const total = this.listeners[name].length
      for (let i = 0; i < total; i++) {
        if (this.listeners[name][i].priority === priority) {
          this.listeners[name].splice(i, 1)
        }
      }
    }
  }

  sort(name, type = EventManager.SORT_ASCENDING) {
    if (typeof this.listeners[name] === 'undefined') {
      return
    }

    const total = this.listeners[name].length
    let pos, guard, listener, temporary
    for (let i = 0; i < total - 1; i++) {
      pos = i
      for (let j = i + 1; j < total; j++) {
        guard    = this.listeners[name][pos]
        listener = this.listeners[name][j]
        if (type === EventManager.SORT_ASCENDING && guard.priority > listener.priority
          || type === EventManager.SORT_DESCENDING && guard.priority < listener.priority) {
          pos = j
        }
      }

      if (i !== pos) {
        temporary                 = this.listeners[name][i]
        this.listeners[name][i]   = this.listeners[name][pos]
        this.listeners[name][pos] = temporary
      }
    }
  }

  has(name) {
    return typeof this.listeners[name] !== 'undefined'
  }

  get(name) {
    return this.has(name) ? this.listeners[name] : []
  }

  fire(name, ...args) {
    this.sort(name)

    let listeners = this.get(name)
    const total = listeners.length
    for (let i = 0; i < total; i++) {
      let listener = listeners[i]
      const isContinue = listener.runner(...args)
      if (isContinue === false) {
        break
      }
    }

    this.off(name)
  }
}
EventManager.SORT_ASCENDING  = 'asc'
EventManager.SORT_DESCENDING = 'desc'
EventManager.PRIORITY_LEAST  = 0
EventManager.PRIORITY_NORMAL = 10
EventManager.PRIORITY_HIGHER = 20