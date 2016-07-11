var http = require('http')
import Request from '../../lib/http/request'

let port = 3003
var server = http.createServer(function(request, response) {
  console.log(Request.from(request))
  // console.log('res -->', response)
  response.end('Okay!')
});

server.listen(port, null, null, () => {
  console.log('server is started at ' + port)
})