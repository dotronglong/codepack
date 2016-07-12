'use strict';

var _server = require('./http/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = new _server2.default({ port: 3003 });
server.start(function () {
  console.log('Server is started! at ' + server.info.url);
}).then(function (request, response) {
  console.log(request);
});