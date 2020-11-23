
import { IController } from '@src/presentation/protocols'
import { makeSignUpValidation } from './signup-validation'
import { makeDbAuthentication } from '@src/main/factory/usecases/account/authentication/DbAuthenticationFactory'
import { makeAddAccount } from '@src/main/factory/usecases/account/add-account/DbAddAccountFactory'
import { makeLogControllerDecorator } from '@src/main/factory/decorators/LogControllerDecoratorFactory'
import { SignUpController } from '@src/presentation/controller/login/signup/SignUpController'

export const makeSignupController = (): IController => {
  const controller = new SignUpController({
    addAccount: makeAddAccount(),
    validation: makeSignUpValidation() ,
    authentication: makeDbAuthentication()
  })
  return makeLogControllerDecorator(controller)
}
