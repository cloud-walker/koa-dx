import Router from '@koa/router'
import {Comment} from '@prisma/client'

import {db} from '../db'

export const commentRouter = new Router({prefix: '/comments'})

export type ResponseGetComments = {data: Comment[]}

export type ResponseGetComment = {data: Comment}

commentRouter.get('/', async (ctx) => {
  const comments = await db.comment.findMany()
  const body: ResponseGetComments = {data: comments}

  ctx.body = body
  ctx.status = 200
})

commentRouter.get('/:id', async (ctx) => {
  const comment = await db.comment.findFirst()

  if (comment == null) {
    throw Error('comment not found.')
  }

  const body: ResponseGetComment = {data: comment}

  ctx.body = body
  ctx.status = 200
})
