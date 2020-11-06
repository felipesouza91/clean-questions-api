
import { LoginController } from '../../../../presentation/controller/login/LoginController'
import { IController } from '../../../../presentation/protocols'

import { makeLoginValidation } from './login-validation'
import { makeDbAuthentication } from '../../usecases/authentication/DbAuthenticationFactory'
import { makeLogControllerDecorator } from '../../decorators/LogControllerDecoratorFactory'

export const makeLoginController = (): IController => {
  const controller = new LoginController({
    authentication: makeDbAuthentication(),
    validation: makeLoginValidation()
  })
  return makeLogControllerDecorator(controller)
}
