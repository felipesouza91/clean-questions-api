
import { IController } from '../../../../../presentation/protocols'
import { makeSignUpValidation } from './signup-validation'
import { makeDbAuthentication } from '../../../usecases/account/authentication/DbAuthenticationFactory'
import { makeAddAccount } from '../../../usecases/account/add-account/DbAddAccountFactory'
import { makeLogControllerDecorator } from '../../../decorators/LogControllerDecoratorFactory'
import { SignUpController } from '../../../../../presentation/controller/login/signup/SignUpController'

export const makeSignupController = (): IController => {
  const controller = new SignUpController({
    addAccount: makeAddAccount(),
    validation: makeSignUpValidation() ,
    authentication: makeDbAuthentication()
  })
  return makeLogControllerDecorator(controller)
}
