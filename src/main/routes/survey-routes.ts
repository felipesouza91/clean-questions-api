import { Router } from 'express'

import { adaptMiddleware } from '../adapter/express-middleware-adapter'
import { adaptRoute } from '../adapter/express-router-adapter'
import { makeAddSurveyController } from '../factory/controllers/survey/add-survey/AddSurveyControllerFactory'
import { makeLoadSurveysController } from '../factory/controllers/survey/load-surveys/LoadSurveysControllerFactory'
import { makeAuthMiddleware } from '../factory/middleware/AuthMiddlewareFactory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  const auth = adaptMiddleware(makeAuthMiddleware())
  router.post('/surveys',
    adminAuth,
    adaptRoute(makeAddSurveyController()))
  router.get('/surveys',
    auth,
    adaptRoute(makeLoadSurveysController()))
}
