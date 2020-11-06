import { Router } from 'express'

import { adaptRoute } from '../adapter/express/express-router-adapter'
import { makeLoginController } from '../factory/controllers/login/LoginControllerFactory'
import { makeSignupController } from '../factory/controllers/signup/SignUpControllerFactory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
