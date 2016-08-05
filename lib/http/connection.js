export default class Connection {
  constructor(request = null, response = null, server = null) {
    this.request  = request
    this.response = response
    this.server   = server
  }
}