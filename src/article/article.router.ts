import Router from '@koa/router'
import {Article} from '@prisma/client'

import {db} from '../db'

export const articleRouter = new Router({prefix: '/articles'})

export type ResponseGetArticles = {data: Article[]}

export type ResponseGetArticle = {data: Article}

articleRouter.get('/', async (ctx) => {
  const articles = await db.article.findMany()
  const body: ResponseGetArticles = {data: articles}

  ctx.body = body
  ctx.status = 200
})

articleRouter.get('/:id', async (ctx) => {
  const article = await db.article.findFirst()

  if (article == null) {
    throw Error('comment not found.')
  }

  const body: ResponseGetArticle = {data: article}

  ctx.body = body
  ctx.status = 200
})

articleRouter.post('/', async (ctx) => {
  ctx.body = {message: 'Route not implement, yet.'}
  ctx.status = 400
})
