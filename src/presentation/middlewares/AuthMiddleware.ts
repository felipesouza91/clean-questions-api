import { AccessDeniedError } from '../erros'
import { forbidden } from '../helpers/http/HttpHelper'
import { IHttpRequest, IHttpResponse, IMiddleware } from '../protocols'

export class AuthMiddleware implements IMiddleware {
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    return await Promise.resolve(forbidden(new AccessDeniedError()))
  }
}
