import config from '@src/main/config/env'
import { AccountMongoRepository } from '@src/infra/db/mongodb/account-repository/AccountRepository'
import { ILoadAccountByToken } from '@src/domain/usecases/ILoadAccountByToken'
import { DbLoadAccountByToken } from '@src/data/usecase/load-account-by-token/DbLoadAccountByToken'
import { JwtAdapter } from '@src/infra/cryptography/jwt-adapter/JwtAdapter'

export const makeLoadAccountByToken = (): ILoadAccountByToken => {
  const decrypter = new JwtAdapter(config.jwtSecret)
  const accountRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken({
    decrypter,loadAccountByTokenRepository: accountRepository
  })
}
