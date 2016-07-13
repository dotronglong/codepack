import Server from './http/server'

let server = new Server()
server.start((conn) => {
  console.log(`[3003][${conn.request.method}] ${conn.request.uri.path}`)
  conn.response.body = {status: true, port: 3003}
  conn.response.send()
}, (e) => {console.log(e)}).then((conn) => {
  console.log('Server is started! at ' + server.info.url)
}).catch (e => {console.log(e)})