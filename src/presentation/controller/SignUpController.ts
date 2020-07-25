import { HttpRequest,HttpResponse } from '../protocols/Http'
import { MissingParamError } from '../erros/MissingParamError'
export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const { body } = httpRequest
    if (!body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }
    if (!body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }
  }
}
