
import { DbAddAccount } from '../../../data/usecase/add-account/DbAddAccount'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter/BcryptAdapter'

import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/AccountRepository'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/Log'
import { SignUpController } from '../../../presentation/controller/signup/SignUpController'
import { IController } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorator/Log'
import { makeSignUpValidation } from './signup-validation'
import config from '../../config/env'
export const makeSignupController = (): IController => {
  const bcryptAdapter = new BcryptAdapter(Number(config.salt))
  const accountRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount({ hasher: bcryptAdapter, addAccountRepository: accountRepository })
  const controller = new SignUpController({ addAccount: dbAddAccount,validation: makeSignUpValidation() })
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator({ controller, logErrorRepository })
}
