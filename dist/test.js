"use strict";

var _router = require("./http/routing/router");

var _router2 = _interopRequireDefault(_router);

var _route = require("./http/routing/route");

var _route2 = _interopRequireDefault(_route);

var _request = require("./http/request");

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = "home",
    path = "/my-path"; // import App from './app'
// import {ServerHttp} from './http/server'
// import KernelPlugin from './plugin/kernel'
// import HandlerPlugin from './plugin/handler'
// import Route from "./http/routing/route"
//
// let app = new App(),
//     server = new ServerHttp(3344)
// app.router.add(new Route("my_route", "GET", "/accounts/{id}"))
// app.router.add(new Route("my_route_user", "GET", "/accounts/user/{id}"))
//
// app.servers.add(server)
// app.plugins.add(KernelPlugin)
// app.plugins.add(HandlerPlugin)
// app.run()

// import Route from "./http/routing/route"
// import Request from "./http/request"
// let route = new Route()
// route.name = 'route_without_host_and_port'
// route.host = "localhost"
// route.port = null
// route.path = "/accounts/{gender}/{id}-{name}"
//
// let request = new Request()
// request.host = "localhost"
// request.path = "/accounts/male/1988-longdo"
// request.method = "GET"
// console.log(route.match(request))
// expect(route.match(request)).to.be.true
// expect(route.matches).to.deep.equal({id: "1988", name: "longdo"})

var router = new _router2.default(),
    route = new _route2.default(name, _request2.default.METHOD_POST, path);
try {
  console.log(router.length);
  router.add(route);
  console.log(router, router.length);
} catch (e) {
  console.log(e);
}