import { ILoadAccountByToken } from '../../domain/usecases/ILoadAccountByToken'
import { AccessDeniedError } from '../erros'
import { forbidden } from '../helpers/http/HttpHelper'
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
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      await this.loadAccountByToken.load(accessToken)
    }
    return await Promise.resolve(forbidden(new AccessDeniedError()))
  }
}
