import { DbAuthentication } from '../../../data/usecase/authentication/DbAuthentication'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter/BcryptAdapter'
import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter/JwtAdapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/AccountRepository'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/Log'
import { LoginController } from '../../../presentation/controller/login/LoginController'
import { IController } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorator/Log'
import { makeLoginValidation } from './login-validation'
import config from '../../config/env'
export const makeLoginController = (): IController => {
  const encrypter = new JwtAdapter(config.jwtSecret)
  const hashCompare = new BcryptAdapter(Number(config.salt))
  const accountRepository = new AccountMongoRepository()
  const validation = makeLoginValidation()
  const authentication = new DbAuthentication({
    encrypter,
    hashCompare,
    loadAccountByEmailRepository: accountRepository,
    updateAccessTokenRepository: accountRepository
  })
  const logErrorRepository = new LogMongoRepository()
  const controller = new LoginController({ authentication, validation })
  return new LogControllerDecorator({ controller, logErrorRepository })
}
