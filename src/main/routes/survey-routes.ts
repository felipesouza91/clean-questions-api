import { Router } from 'express'

import { adaptMiddleware } from '../adapter/express-middleware-adapter'
import { adaptRoute } from '../adapter/express-router-adapter'
import { makeAddSurveyController } from '../factory/controllers/survey/add-survey/AddSurveyControllerFactory'
import { makeAuthMiddleware } from '../factory/middleware/AuthMiddlewareFactory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  router.post('/surveys',
    adminAuth,
    adaptRoute(makeAddSurveyController()))
}
