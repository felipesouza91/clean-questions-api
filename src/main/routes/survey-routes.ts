import { Router } from 'express'

import { adaptRoute } from '../adapter/express-router-adapter'
import { makeAddSurveyController } from '../factory/controllers/survey/add-survey/AddSurveyControllerFactory'
import { makeLoadSurveysController } from '../factory/controllers/survey/load-surveys/LoadSurveysControllerFactory'

import { adminAuth } from '../middlewares/admin-auth'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/surveys',
    adminAuth,
    adaptRoute(makeAddSurveyController()))
  router.get('/surveys',
    auth,
    adaptRoute(makeLoadSurveysController()))
}
