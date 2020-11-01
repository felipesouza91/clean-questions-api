
import { DbAddAccount } from '../../../data/usecase/add-account/DbAddAccount'
import { BcryptAdapter } from '../../../infra/cryptography/BcryptAdapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/Account'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/Log'
import { SignUpController } from '../../../presentation/controller/signup/SignUpController'
import { IController } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorator/Log'
import { makeSignUpValidation } from './signup-validation'

export const makeSignupController = (): IController => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountRepository)
  const controller = new SignUpController(dbAddAccount, makeSignUpValidation())
  const logErroRespository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logErroRespository)
}
