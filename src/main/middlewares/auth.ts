import { adaptMiddleware } from '../adapter/express-middleware-adapter'
import { makeAuthMiddleware } from '../factory/middleware/AuthMiddlewareFactory'

export const auth = adaptMiddleware(makeAuthMiddleware())
