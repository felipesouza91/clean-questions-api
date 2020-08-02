import { Router } from 'express'
import { makeSignupController } from '../factory/signup'
import { adaptRoute } from '../adapter/express-router-adapter'
export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()))
}
