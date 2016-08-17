import Bag from "../bag"

export default class Uri {
  constructor(scheme, user, pwd, host, port, path = "/", query = "", fragment = "") {
    this.scheme   = scheme
    this.user     = user
    this.pwd      = pwd
    this.host     = host
    this.port     = port
    this.path     = path
    this.query    = query
    this.fragment = fragment
  }
  
  get scheme() {
    return this._scheme
  }

  set scheme(scheme) {
    this._scheme = typeof scheme === "undefined" ? Uri.SCHEME_HTTP : scheme
  }

  get user() {
    return this._user
  }

  set user(user) {
    this._user = user
  }

  get pwd() {
    return this._pwd
  }

  set pwd(pwd) {
    this._pwd = pwd
  }

  get host() {
    return this._host
  }

  set host(host) {
    if (typeof host === "undefined") {
      this._host = ""
    } else {
      let matches = host.match(/^([a-zA-Z0-9_.-]+):?(\d+)?$/i)
      if (matches) {
        this._host = matches[1]
        this._port = typeof matches[2] === "undefined" ? this._port : matches[2]
      }
    }
  }

  get port() {
    return this._port
  }

  set port(port) {
    if (typeof port === "undefined" && this._port) {
      return
    }

    this._port = port
  }

  get path() {
    return this._path
  }

  set path(path) {
    this._path = typeof path === "undefined" ? "/" : path
  }

  get userInfo() {
    return this._user !== "" && this._pwd !== "" ? `${this._user}:${this._pwd}` : ""
  }

  set userInfo(userInfo) {
    if (typeof userInfo === "undefined" ||  userInfo === "") {
      this._user = this._pwd = ""
      return
    }

    let args  = userInfo.split(":")
    this.user = args[0]
    this.pwd  = args[1]
  }

  get query() {
    return this._query
  }

  set query(query) {
    if (typeof query === "undefined") {
      return
    }
    this._query = new Bag()
    query.split("&").forEach((v) => {
      let args = v.split("=")
      this._query.set(args[0], args[1])
    })
  }

  toString() {
    let query = this.query.toString()
    query     = query === "" ? "" : `?${query}`

    const scheme = this.scheme
      , userInfo = this.userInfo === "" ? "" : `${this.userInfo}@`
      , host     = this.host
      , port     = (this.port === Uri.PORT_HTTP && this.scheme === Uri.SCHEME_HTTP
    || this.port === Uri.PORT_HTTPS && this.scheme === Uri.SCHEME_HTTPS
    || typeof this.port === "undefined") ? "" : `:${this.port}`
      , path     = this.path
      , fragment = this.fragment === "" ? "" : `#${this.fragment}`

    return `${scheme}://${userInfo}${host}${port}${path}${query}${fragment}`
  }

  static from(string) {
    const pattern = /^([a-z][a-z0-9+.-]*):(?:\/\/((?:(?=((?:[a-z0-9-._~!$&"()*+,;=:]|%[0-9A-F]{2})*))(\3)@)?(?=(\[[0-9A-F:.]{2,}\]|(?:[a-z0-9-._~!$&"()*+,;=]|%[0-9A-F]{2})*))\5(?::(?=(\d*))\6)?)(\/(?=((?:[a-z0-9-._~!$&"()*+,;=:@\/]|%[0-9A-F]{2})*))\8)?|(\/?(?!\/)(?=((?:[a-z0-9-._~!$&"()*+,;=:@\/]|%[0-9A-F]{2})*))\10)?)(?:\?(?=((?:[a-z0-9-._~!$&"()*+,;=:@\/?]|%[0-9A-F]{2})*))\11)?(?:#(?=((?:[a-z0-9-._~!$&"()*+,;=:@\/?]|%[0-9A-F]{2})*))\12)?$/i
    let args      = null, uri = new Uri()
    if (args = string.match(pattern)) {
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
    if (typeof uri.port === "undefined" && typeof uri.scheme !== "undefined") {
      switch (uri.scheme) {
        case Uri.SCHEME_HTTP:
          uri.port = Uri.PORT_HTTP
          break
        case Uri.SCHEME_HTTPS:
          uri.port = Uri.PORT_HTTPS
          break
        default:
          throw new Error(`${uri.scheme} scheme is not supported yet.`)
      }
    }

    return uri
  }
}
Uri.SCHEME_HTTP  = "http"
Uri.SCHEME_HTTPS = "https"
Uri.PORT_HTTP    = 80
Uri.PORT_HTTPS   = 443