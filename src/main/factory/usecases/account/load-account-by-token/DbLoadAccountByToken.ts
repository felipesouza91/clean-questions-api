import config from '../../../../config/env'
import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account-repository/AccountRepository'
import { ILoadAccountByToken } from '../../../../../domain/usecases/ILoadAccountByToken'
import { DbLoadAccountByToken } from '../../../../../data/usecase/load-account-by-token/DbLoadAccountByToken'
import { JwtAdapter } from '../../../../../infra/cryptography/jwt-adapter/JwtAdapter'

export const makeLoadAccountByToken = (): ILoadAccountByToken => {
  const decrypter = new JwtAdapter(config.jwtSecret)
  const accountRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken({
    decrypter,loadAccountByTokenRepository: accountRepository
  })
}
