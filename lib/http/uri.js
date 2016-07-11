import Bag from '../bag'

export default class Uri {
  constructor(scheme, user, pwd, host, port, path, query, fragment) {
    this.scheme   = scheme
    this.user     = user
    this.pwd      = pwd
    this.host     = host
    this.port     = port
    this.path     = path
    this.query    = query
    this.fragment = fragment
  }

  get userInfo() {
    return `${this.user}:${this.pwd}`
  }

  set userInfo(userInfo) {
    let args  = userInfo.split(':')
    this.user = args[0]
    this.pwd  = args[1]
  }

  get query() {
    return this._query
  }

  set query(query) {
    if (typeof query === 'undefined') {
      return
    }
    this._query = new Bag()
    query.split('&').forEach((v) => {
      let args = v.split('=')
      this._query.set(args[0], args[1])
    })
  }

  toString() {
    let uri = this.scheme

    if (this.userInfo !== '') {
      uri += this.userInfo
    }

    if (this.port !== Uri.PORT_HTTP) {
      uri += `:${this.port}`
    }

    const queries = this.query.all()
    let query     = ''
    Object.keys(queries).map(v => query += `&${v}=${queries[v]}`)
    if (query !== '') {
      uri += `?${query}`
    }

    if (this.fragment !== '') {
      uri += `#${this.fragment}`
    }

    return uri
  }

  static parse(string) {
    let args = null, uri = new Uri()
    if (args = string.match(/^([a-z][a-z0-9+.-]*):(?:\/\/((?:(?=((?:[a-z0-9-._~!$&'()*+,;=:]|%[0-9A-F]{2})*))(\3)@)?(?=(\[[0-9A-F:.]{2,}\]|(?:[a-z0-9-._~!$&'()*+,;=]|%[0-9A-F]{2})*))\5(?::(?=(\d*))\6)?)(\/(?=((?:[a-z0-9-._~!$&'()*+,;=:@\/]|%[0-9A-F]{2})*))\8)?|(\/?(?!\/)(?=((?:[a-z0-9-._~!$&'()*+,;=:@\/]|%[0-9A-F]{2})*))\10)?)(?:\?(?=((?:[a-z0-9-._~!$&'()*+,;=:@\/?]|%[0-9A-F]{2})*))\11)?(?:#(?=((?:[a-z0-9-._~!$&'()*+,;=:@\/?]|%[0-9A-F]{2})*))\12)?$/i)) {
      uri.scheme   = args[1]
      uri.userInfo = args[3]
      uri.host     = args[5]
      uri.port     = args[6]
      uri.path     = args[7]
      uri.query    = args[11]
      uri.fragment = args[12]
    }

    return this.validate(uri)
  }

  static validate(uri) {
    let port
    switch (uri.scheme) {
      case Uri.SCHEME_HTTPS:
        port = Uri.PORT_HTTPS
        break
      case Uri.SCHEME_HTTP:
      default:
        port = Uri.PORT_HTTP
        break
    }
    uri.port = port
    
    return uri
  }
}
Uri.SCHEME_HTTP  = 'http'
Uri.SCHEME_HTTPS = 'https'
Uri.PORT_HTTP    = 80
Uri.PORT_HTTPS   = 443