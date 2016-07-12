import Bag from '../bag'

const TYPE_OBJECT   = 'object'
const TYPE_FUNCTION = 'function'
const TYPE_STRING   = 'string'
class Body {
  constructor(content = '', type) {
    this.type    = type
    this.content = content
  }

  get content() {
    return this.parsedContent
  }

  set content(content) {
    switch (this.type) {
      case Message.CONTENT_JSON:
        this.handleContentJson(content)
        break
    }
  }

  handleContentJson(content) {
    const contentType = typeof content
    switch (contentType) {
      case TYPE_OBJECT:
        try {

          this.parsedContent = content
          this.rawContent    = JSON.stringify(content)
        } catch (e) {
          console.log(e)
        }
        break
      case TYPE_STRING:
        if (content === '') {
          this.parsedContent = {}
        } else {
          this.parsedContent = JSON.parse(content)
        }
        this.rawContent = content
        break
      default:
        break
    }
  }

  toString() {
    return this.rawContent
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
}
Message.HEADER_CONTENT_TYPE = 'Content-Type'
Message.HEADER_USER_AGENT   = 'User-Agent'
Message.HEADER_HOST         = 'Host'

Message.CONTENT_XML  = 'text/xml'
Message.CONTENT_HTML = 'text/html'
Message.CONTENT_TEXT = 'text/plain'
Message.CONTENT_JSON = 'application/json'