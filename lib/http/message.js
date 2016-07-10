import Bag from '../bag'

export default class Message {
  constructor(body = '', headers = {}) {
    this._body   = body
    this.headers = new Bag(headers)
  }

  get body() {
    let body = this._body
    const contentType = this.headers.get(Message.HEADER_CONTENT_TYPE, Message.CONTENT_JSON)
    switch (contentType) {
      case Message.CONTENT_JSON:
        body = JSON.parse(body)
        break

      default:
        break
    }

    return body
  }

  set body(body) {
    this._body = body
  }
}
Message.HEADER_CONTENT_TYPE = 'content-type'

Message.CONTENT_XML  = 'text/xml'
Message.CONTENT_HTML = 'text/html'
Message.CONTENT_TEXT = 'text/plain'
Message.CONTENT_JSON = 'application/json'