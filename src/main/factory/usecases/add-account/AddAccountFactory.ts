import config from '../../../config/env'
import { BcryptAdapter } from '../../../../infra/cryptography/bcrypt-adapter/BcryptAdapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account-repository/AccountRepository'
import { DbAddAccount } from '../../../../data/usecase/add-account/DbAddAccount'
import { IAddAccount } from '../../../../domain/usecases/IAddAccount'

export const makeAddAccount = (): IAddAccount => {
  const bcryptAdapter = new BcryptAdapter(Number(config.salt))
  const accountRepository = new AccountMongoRepository()
  return new DbAddAccount({ hasher: bcryptAdapter, addAccountRepository: accountRepository })
}
