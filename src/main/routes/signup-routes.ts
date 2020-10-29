import { Router } from 'express'

import { adaptRoute } from '../adapter/express-router-adapter'
import { makeSignupController } from '../factory/signup/signup'
export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()))
}
