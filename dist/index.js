'use strict';

var _request = require('../lib/http/request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var http = require('http');


var port = 3003;
var server = http.createServer(function (request, response) {
  // console.log(request)
  _request2.default.from(request);
  // console.log('res -->', response)
  response.end('Okay!');
});

server.listen(port, null, null, function () {
  console.log('server is started at ' + port);
});