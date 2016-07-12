import Server from './http/server'

let server = new Server()
server.start((conn) => {
  console.log(`[3003][${conn.request.method}] ${conn.request.uri.path}`)
  conn.response.body = {status: true, port: 3003}
  conn.response.send()
}).then((conn) => {
  console.log('Server is started! at ' + server.info.url)
}).catch (e => {console.log(e)})

// let anotherServer = new Server({port: 3004})
// anotherServer.start(() => {console.log('Another Server is started! at ' + anotherServer.info.url)}).then((conn) => {
//   console.log(`[3004][${conn.request.method}] ${conn.request.uri.path}`)
//   conn.response.body = {status: true, port: 3004}
//   conn.response.send()
// })