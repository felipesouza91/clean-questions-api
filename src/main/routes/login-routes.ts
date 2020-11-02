import { Router } from 'express'

import { adaptRoute } from '../adapter/express/express-router-adapter'
import { makeLoginController } from '../factory/login/LoginFactory'
import { makeSignupController } from '../factory/signup/SignUpFactory'
export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
