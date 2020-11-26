import config from '@src/main/config/env'
import { BcryptAdapter } from '@src/infra/cryptography/bcrypt-adapter/BcryptAdapter'
import { AccountMongoRepository } from '@src/infra/db/mongodb/account-repository/AccountRepository'
import { DbAddAccount } from '@src/data/usecase/account/add-account/DbAddAccount'
import { IAddAccount } from '@src/domain/usecases/account/IAddAccount'

export const makeAddAccount = (): IAddAccount => {
  const bcryptAdapter = new BcryptAdapter(Number(config.salt))
  const accountRepository = new AccountMongoRepository()
  return new DbAddAccount({
    hasher: bcryptAdapter,
    addAccountRepository: accountRepository ,
    loadAccountByEmailRepository: accountRepository
  })
}
