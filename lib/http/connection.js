export default class Connection {
  constructor(server, request, response) {
    this.server   = server
    this.request  = request
    this.response = response
  }
}