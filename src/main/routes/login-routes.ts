import { Router } from 'express'

import { adaptRoute } from '../adapter/express-router-adapter'
import { makeLoginController } from '../factory/controllers/login/login/LoginControllerFactory'
import { makeSignupController } from '../factory/controllers/login/signup/SignUpControllerFactory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
