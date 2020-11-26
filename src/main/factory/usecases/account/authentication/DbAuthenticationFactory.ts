import { DbAuthentication } from '@src/data/usecase/account/authentication/DbAuthentication'
import { BcryptAdapter } from '@src/infra/cryptography/bcrypt-adapter/BcryptAdapter'
import { JwtAdapter } from '@src/infra/cryptography/jwt-adapter/JwtAdapter'
import { AccountMongoRepository } from '@src/infra/db/mongodb/account-repository/AccountRepository'
import config from '@src/main/config/env'
import { IAuthentication } from '@src/domain/usecases/account/IAuthentication'

export const makeDbAuthentication = (): IAuthentication => {
  const encrypter = new JwtAdapter(config.jwtSecret)
  const hashCompare = new BcryptAdapter(Number(config.salt))
  const accountRepository = new AccountMongoRepository()
  return new DbAuthentication({
    encrypter,
    hashCompare,
    loadAccountByEmailRepository: accountRepository,
    updateAccessTokenRepository: accountRepository
  })
}
