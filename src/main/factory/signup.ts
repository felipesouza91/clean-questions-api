import { SignUpController } from '../../presentation/controller/signup/SignUpController'
import { EmailValidatorAdapter } from '../../utils/EmailValidatorAdapter'
import { DbAddAccount } from '../../data/usecase/add-account/DbAddAccount'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/Account'
import { BcryptAdapter } from '../../infra/cryptography/BcryptAdapter'
export const makeSignupController = (): SignUpController => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter,accountRepository)
  return new SignUpController(emailValidatorAdapter, dbAddAccount)
}
