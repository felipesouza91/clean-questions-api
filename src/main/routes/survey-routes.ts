import { Router } from 'express'

import { adaptRoute } from '../adapter/express-router-adapter'
import { makeAddSurveyController } from '../factory/controllers/survey/add-survey/AddSurveyControllerFactory'

export default (router: Router): void => {
  router.post('/surveys', adaptRoute(makeAddSurveyController()))
}
