var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    port = process.env.PORT || 3000,
    root = process.env.SERVER_ROOT || ''

http.createServer(function(request, response) {
  var url  = (request.url === '' || request.url === '/') ? 'index.html' : request.url
  var file = path.join(__dirname, root, url)
  console.log('GET ' + file)
  try {
    var stat = fs.statSync(file)
    response.writeHead(200, {
      'Content-Length': stat.size
    })

    var readStream = fs.createReadStream(file)
    readStream.pipe(response)
  } catch (e) {
    response.writeHead(404)
    response.end()
  }
}).listen(port, function() {console.log('Server is started listening on port ' + port)})