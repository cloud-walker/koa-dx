import Koa from 'koa'

import {router} from './router'

const port = 4000
const server = new Koa()

server.use(router.routes()).use(router.allowedMethods())

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
