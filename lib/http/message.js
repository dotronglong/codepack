import Header from './header'

class Body {
  constructor(content, type = Message.CONTENT_JSON) {
    this.content = content
    this.type    = type

    this.rawContent    = ''
    this.parsedContent = {}
  }
  
  toString() {
    return this.rawContent
  }

  get content() {
    return this.parsedContent
  }

  set content(content) {
    if (typeof content === 'undefined') {
      return
    }

    switch (this.type) {
      case Message.CONTENT_JSON:
        this.handleContentJson(content)
        break
      default:
        throw new Error('Invalid Body Content Type')
        break
    }
  }

  handleContentJson(content) {
    const contentType = typeof content
    switch (contentType) {
      case 'object':
        this.parsedContent = content
        this.rawContent    = JSON.stringify(content)
        break
      case 'string':
        if (content === '') {
          this.parsedContent = {}
        } else {
          this.parsedContent = JSON.parse(content)
        }
        this.rawContent = content
        break
      case 'function':
        this.handleContentJson(content())
        break
      default:
        break
    }
  }
}

export default class Message {
  constructor(headers, body) {
    this.headers  = headers
    this.body     = body
    this.resource = null
  }

  get type() {
    return this.headers.get(Message.HEADER_CONTENT_TYPE, Message.CONTENT_JSON)
  }

  get headers() {
    return this._headers
  }

  set headers(headers) {
    if (typeof headers === 'undefined') {
      headers = {}
    }

    this._headers = new Header(headers)
  }

  get body() {
    return this._body
  }

  set body(body) {
    if (typeof body === 'undefined') {
      return
    }

    this._body = body
  }

  on(event, callback) {
    if (this.resource !== null) {
      this.resource.on(event, callback)
    }
  }
}
Message.Body = Body

Message.HEADER_CONTENT_TYPE = 'Content-Type'
Message.HEADER_USER_AGENT   = 'User-Agent'
Message.HEADER_HOST         = 'Host'

Message.CONTENT_XML  = 'text/xml'
Message.CONTENT_HTML = 'text/html'
Message.CONTENT_TEXT = 'text/plain'
Message.CONTENT_JSON = 'application/json'