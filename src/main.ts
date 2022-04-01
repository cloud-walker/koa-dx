import Koa from 'koa'
import koaBody from 'koa-body'

import {router} from './router'

const port = 4000
const server = new Koa()

server.use(koaBody())
server.use(router.routes()).use(router.allowedMethods())

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
