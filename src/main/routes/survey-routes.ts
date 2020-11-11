import { Router } from 'express'

import { adaptRoute } from '../adapter/express/express-router-adapter'
import { makeAddSurveyController } from '../factory/controllers/add-survey/AddSurveyControllerFactory'

export default (router: Router): void => {
  router.post('/surveys', adaptRoute(makeAddSurveyController()))
}
