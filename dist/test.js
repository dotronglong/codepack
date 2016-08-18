'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _server = require('./http/server');

var _kernel = require('./plugin/kernel');

var _kernel2 = _interopRequireDefault(_kernel);

var _handler = require('./plugin/handler');

var _handler2 = _interopRequireDefault(_handler);

var _route = require('./http/routing/route');

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _app2.default(),
    server = new _server.ServerHttp(3344);
app.router.add(new _route2.default("my_route", "GET", "/accounts/{id}"));
app.router.add(new _route2.default("my_route_user", "GET", "/accounts/user/{id}"));

app.servers.add(server);
app.plugins.add(_kernel2.default);
app.plugins.add(_handler2.default);
app.run();

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