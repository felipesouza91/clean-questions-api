
import { IController } from '../../../../../presentation/protocols'

import { makeLoginValidation } from './login-validation'
import { makeDbAuthentication } from '../../../usecases/account/authentication/DbAuthenticationFactory'
import { makeLogControllerDecorator } from '../../../decorators/LogControllerDecoratorFactory'
import { LoginController } from '../../../../../presentation/controller/login/login/LoginController'

export const makeLoginController = (): IController => {
  const controller = new LoginController({
    authentication: makeDbAuthentication(),
    validation: makeLoginValidation()
  })
  return makeLogControllerDecorator(controller)
}
