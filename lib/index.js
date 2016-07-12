import Server from './http/server'

let server = new Server({port: 3003})
server.start(() => {
  console.log('Server is started! at ' + server.info.url)
}).then((request, response) => {
  console.log(request)
})