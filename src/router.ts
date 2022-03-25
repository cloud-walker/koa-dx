import Router from '@koa/router'
import {db} from './db'

export const router = new Router()

router.get('/articles', async (ctx) => {
  const articles = await db.article.findMany()

  ctx.body = {items: articles}
  ctx.status = 200
})

// router.post('/articles', (ctx) => {

// })
