import { ILoadAccountByToken } from '../../domain/usecases/ILoadAccountByToken'
import { AccessDeniedError } from '../erros'
import { forbidden, ok, serverError } from '../helpers/http/HttpHelper'
import { IHttpRequest, IHttpResponse, IMiddleware } from '../protocols'

interface IAuthMiddlewareProps {
  loadAccountByToken: ILoadAccountByToken
  role?: string
}

export class AuthMiddleware implements IMiddleware {
  private readonly loadAccountByToken: ILoadAccountByToken
  private readonly role?: string
  constructor (props: IAuthMiddlewareProps) {
    Object.assign(this, props)
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken, this.role)
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
