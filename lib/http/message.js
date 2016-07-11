import Bag from '../bag'

export default class Message {
  constructor(content = '', headers = {}) {
    this.content  = content
    this.headers  = new Bag(headers)
    this.resource = null
  }

  getContent() {
    let content       = this.content
    const contentType = this.headers.get(Message.HEADER_CONTENT_TYPE, Message.CONTENT_JSON)
    switch (contentType) {
      case Message.CONTENT_JSON:
        content = JSON.parse(content)
        break

      default:
        break
    }

    return content
  }

  from(resource) {
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