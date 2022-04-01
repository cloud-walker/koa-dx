import Koa from 'koa'
import koaBody from 'koa-body'
import {z} from 'zod'
import cors from '@koa/cors'

import {router} from './router'

const port = 4000
const server = new Koa()

server.use(cors())
server.use(koaBody())
server.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err instanceof z.ZodError) {
      ctx.body = err.issues
      ctx.status = 400
      return
    }

    ctx.body = {message: 'Something went wrong.'}
    ctx.status = 500
  }
})
server.use(router.routes()).use(router.allowedMethods())

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
