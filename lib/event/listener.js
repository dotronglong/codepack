const LIMIT_NONE  = -1
const LIMIT_ONCE  = 1
const LIMIT_TWICE = 2

const PRIORITY_LOW    = 1
const PRIORITY_NORMAL = 5
const PRIORITY_HIGH   = 10

export default class Listener {
  constructor(runner, priority = PRIORITY_NORMAL, limit = LIMIT_NONE) {
    this.runner   = runner
    this.priority = priority
    this.limit    = limit
  }
}
Listener.LIMIT_NONE  = LIMIT_NONE
Listener.LIMIT_ONCE  = LIMIT_ONCE
Listener.LIMIT_TWICE = LIMIT_TWICE

Listener.PRIORITY_LOW    = PRIORITY_LOW
Listener.PRIORITY_NORMAL = PRIORITY_NORMAL
Listener.PRIORITY_HIGH   = PRIORITY_HIGH
