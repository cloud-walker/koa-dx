import Router from '@koa/router'
import {Article} from '@prisma/client'
import {z} from 'zod'

import {db} from '../db'

const ParamsGetArticles = z.object({
  limit: z.number().min(0).max(100).optional(),
  search: z.string().optional(),
})

const ParamsGetArticle = z.object({
  id: z.preprocess(Number, z.number().int()),
})
const ParamsUpdateArticle = ParamsGetArticle
const ParamsDeleteArticle = ParamsGetArticle

const PayloadUpsertArticle = z.object({
  title: z.string().min(1),
  content: z.string().optional(),
  isPublished: z.boolean().default(false),
})

export const articleRouter = new Router({prefix: '/articles'})

export type ParamsGetArticles = z.infer<typeof ParamsGetArticles>
export type ResponseGetArticles = {data: Article[]}

export type ParamsGetArticle = z.infer<typeof ParamsGetArticle>
export type ResponseGetArticle = {data: Article}

export type PayloadCreateArticle = z.infer<typeof PayloadUpsertArticle>
export type ResponseCreateArticle = ResponseGetArticle

export type ParamsUpdateArticle = z.infer<typeof ParamsUpdateArticle>
export type PayloadUpdateArticle = PayloadCreateArticle
export type ResponseUpdateArticle = ResponseGetArticle

export type ParamsDeleteArticle = z.infer<typeof ParamsDeleteArticle>
export type ResponseDeleteArticle = void

articleRouter.get('/', async (ctx) => {
  const searchParams = ParamsGetArticles.parse(ctx.params)

  const articles = await db.article.findMany({
    where: {title: {contains: searchParams.search ?? ''}},
    take: searchParams.limit ?? 10,
  })
  const body: ResponseGetArticles = {data: articles}

  ctx.body = body
  ctx.status = 200
})

articleRouter.get('/:id', async (ctx) => {
  const searchParams = ParamsGetArticle.parse(ctx.params)
  const article = await db.article.findFirst({
    where: {id: {equals: +searchParams.id}},
  })

  if (article == null) {
    ctx.body = {message: 'Article not found'}
    ctx.status = 404
    return
  }

  const body: ResponseGetArticle = {data: article}

  ctx.body = body
  ctx.status = 200
})

articleRouter.post('/', async (ctx) => {
  const data = PayloadUpsertArticle.parse(ctx.request.body)
  const article = await db.article.create({data})
  const body: ResponseCreateArticle = {data: article}

  ctx.body = body
  ctx.status = 201
})

articleRouter.put('/:id', async (ctx) => {
  const searchParams = ParamsGetArticle.parse(ctx.params)
  const data = PayloadUpsertArticle.parse(ctx.request.body)
  const article = await db.article.update({
    where: {id: +searchParams.id},
    data,
  })
  const body: ResponseUpdateArticle = {data: article}

  ctx.body = body
  ctx.status = 200
})

articleRouter.delete('/:id', async (ctx) => {
  const searchParams = ParamsDeleteArticle.parse(ctx.params)
  await db.article.delete({
    where: {id: +searchParams.id},
  })

  ctx.status = 204
})
