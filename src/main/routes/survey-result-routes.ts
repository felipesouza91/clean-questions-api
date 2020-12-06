import { Router } from 'express'
import { adaptRoute } from '../adapter/express-router-adapter'
import { makeSaveSurveyResultController } from '../factory/controllers/survey-result/save-result/SaveSurveyResultControllerFactory'
import { makeLoadSurveyResultController } from '../factory/controllers/survey-result/load-result/LoadSurveyResultControllerFactory'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.put('/surveys/:survey_id/results',
    auth,
    adaptRoute(makeSaveSurveyResultController()))
  router.get('/surveys/:survey_id/results',
    auth,
    adaptRoute(makeLoadSurveyResultController()))
}
