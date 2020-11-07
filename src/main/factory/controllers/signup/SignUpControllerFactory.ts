
import { IController } from '../../../../presentation/protocols'
import { makeSignUpValidation } from './signup-validation'
import { makeDbAuthentication } from '../../usecases/authentication/DbAuthenticationFactory'
import { makeAddAccount } from '../../usecases/add-account/AddAccountFactory'
import { makeLogControllerDecorator } from '../../decorators/LogControllerDecoratorFactory'
import { SignUpController } from '../../../../presentation/controller/login/signup/SignUpController'

export const makeSignupController = (): IController => {
  const controller = new SignUpController({
    addAccount: makeAddAccount(),
    validation: makeSignUpValidation() ,
    authentication: makeDbAuthentication()
  })
  return makeLogControllerDecorator(controller)
}
