import { ILoadAccountByToken } from '../../domain/usecases/ILoadAccountByToken'
import { AccessDeniedError } from '../erros'
import { forbidden, ok, serverError } from '../helpers/http/HttpHelper'
import { IHttpRequest, IHttpResponse, IMiddleware } from '../protocols'

interface IAuthMiddlewareProps {
  loadAccountByToken: ILoadAccountByToken
}

export class AuthMiddleware implements IMiddleware {
  private readonly loadAccountByToken: ILoadAccountByToken

  constructor (props: IAuthMiddlewareProps) {
    Object.assign(this, props)
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken)
        if (account) {
          return ok({ accountId: account.id })
        }
      }
      return await Promise.resolve(forbidden(new AccessDeniedError()))
    } catch (error) {
      return serverError(error)
    }
  }
}
