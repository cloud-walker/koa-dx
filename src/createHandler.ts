import {Context} from 'koa'

type ResponseObject<TBody> = {status: number; body: TBody}

export function createHandler<TBody>(
  mapper: (
    ctx: Context,
  ) => ResponseObject<TBody> | Promise<ResponseObject<TBody>>,
) {
  const handler = async (ctx: Context) => {
    const maybePromise = mapper(ctx)

    const {status, body} =
      'then' in maybePromise ? await maybePromise : maybePromise

    ctx.status = status
    ctx.body = body
  }
  return handler
}
