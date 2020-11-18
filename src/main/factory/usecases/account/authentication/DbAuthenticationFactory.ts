import { DbAuthentication } from '../../../../../data/usecase/authentication/DbAuthentication'
import { BcryptAdapter } from '../../../../../infra/cryptography/bcrypt-adapter/BcryptAdapter'
import { JwtAdapter } from '../../../../../infra/cryptography/jwt-adapter/JwtAdapter'
import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account-repository/AccountRepository'
import config from '../../../../config/env'
import { IAuthentication } from '../../../../../domain/usecases/IAuthentication'

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
