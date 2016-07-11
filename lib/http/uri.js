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

  toString() {
    let uri = this.scheme

    if (this.userInfo !== '') {
      uri += this.userInfo
    }

    if (this.port !== Uri.PORT_HTTP) {
      uri += `:${this.port}`
    }

    const queries = this.query.all()
    let query = ''
    Object.keys(queries).map(v => query += `&${v}=${queries[v]}`)
    if (query !== '') {
      uri += `?${query}`
    }

    if (this.fragment !== '') {
      uri += `#${this.fragment}`
    }

    return uri
  }
}
Uri.SCHEME_HTTP  = 'http'
Uri.SCHEME_HTTPS = 'https'
Uri.PORT_HTTP    = 80
Uri.PORT_HTTPS   = 443