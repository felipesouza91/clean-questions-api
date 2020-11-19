
import { AuthMiddleware } from '../../../presentation/middlewares/AuthMiddleware'
import { IMiddleware } from '../../../presentation/protocols'
import { makeLoadAccountByToken } from '../usecases/account/load-account-by-token/DbLoadAccountByToken'

export const makeAuthMiddleware = (role?: string): IMiddleware => {
  const loadAccountByToken = makeLoadAccountByToken()
  return new AuthMiddleware({ loadAccountByToken, role })
}
