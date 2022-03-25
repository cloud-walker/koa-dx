import Koa from 'koa'

const port = 4000
const server = new Koa()

server.use((ctx) => {
  ctx.status = 200
  ctx.body = 'hello'
})

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
