import { SignUpController } from '../../presentation/controller/signup/SignUpController'
import { EmailValidatorAdapter } from '../../utils/EmailValidatorAdapter'
import { DbAddAccount } from '../../data/usecase/add-account/DbAddAccount'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/Account'
import { BcryptAdapter } from '../../infra/cryptography/BcryptAdapter'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorator/Log'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/Log'

export const makeSignupController = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountRepository)
  const controller = new SignUpController(emailValidatorAdapter, dbAddAccount)
  const logErroRespository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logErroRespository)
}
