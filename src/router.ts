import Router from '@koa/router'

import {articleRouter} from './article/article.router'
import {commentRouter} from './comment/comment.router'

export const router = new Router()

router.use(articleRouter.routes())
router.use(commentRouter.routes())
