
import { IController } from '@src/presentation/protocols'

import { makeLoginValidation } from './login-validation'
import { makeDbAuthentication } from '@src/main/factory/usecases/account/authentication/DbAuthenticationFactory'
import { makeLogControllerDecorator } from '@src/main/factory/decorators/LogControllerDecoratorFactory'
import { LoginController } from '@src/presentation/controller/login/login/LoginController'

export const makeLoginController = (): IController => {
  const controller = new LoginController({
    authentication: makeDbAuthentication(),
    validation: makeLoginValidation()
  })
  return makeLogControllerDecorator(controller)
}
