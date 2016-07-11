import Bag from '../bag'

class Body {
  constructor(content, type) {
    this.content = content
    this.type    = type
  }

  getContent() {
    let content = this.content
    switch (this.type) {
      case Message.CONTENT_JSON:
        content = JSON.parse(content)
        break
    }

    return content
  }
}
export default class Message {
  constructor(content = '', headers = {}) {
    this.headers  = headers
    this.body     = content
    this.resource = null
  }

  get headers() {
    return this._headers
  }

  set headers(headers) {
    this._headers = new Bag(headers)
  }

  get body() {
    return this._body
  }

  set body(content) {
    if (content instanceof Body) {
      this._body = content
    } else {
      this._body = new Body(content, this.headers.get(Message.HEADER_CONTENT_TYPE, Message.CONTENT_JSON))
    }
  }

  static from(resource) {
    throw new Error('This method must be overridden')
  }
}
Message.HEADER_CONTENT_TYPE = 'content-type'
Message.HEADER_USER_AGENT   = 'user-agent'
Message.HEADER_HOST         = 'host'

Message.CONTENT_XML  = 'text/xml'
Message.CONTENT_HTML = 'text/html'
Message.CONTENT_TEXT = 'text/plain'
Message.CONTENT_JSON = 'application/json'