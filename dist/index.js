'use strict';

var _server = require('./http/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = new _server2.default();
server.start(function (conn) {
  console.log('[3003][' + conn.request.method + '] ' + conn.request.uri.path);
  conn.response.body = { status: true, port: 3003 };
  conn.response.send();
}).then(function (conn) {
  console.log('Server is started! at ' + server.info.url);
}).catch(function (e) {
  console.log(e);
});

// let anotherServer = new Server({port: 3004})
// anotherServer.start(() => {console.log('Another Server is started! at ' + anotherServer.info.url)}).then((conn) => {
//   console.log(`[3004][${conn.request.method}] ${conn.request.uri.path}`)
//   conn.response.body = {status: true, port: 3004}
//   conn.response.send()
// })