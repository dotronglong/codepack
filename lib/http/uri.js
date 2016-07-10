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
    return `${this.scheme}`
  }
}
Uri.SCHEME_HTTP  = 'http'
Uri.SCHEME_HTTPS = 'https'