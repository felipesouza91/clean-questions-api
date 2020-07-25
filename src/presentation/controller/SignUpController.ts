import { HttpRequest,HttpResponse } from '../protocols/Http'
import { MissingParamError } from '../erros/MissingParamError'
import { badRequest } from '../helpers/HttpHelper'
export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const { body } = httpRequest
    if (!body.name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!body.email) {
      return badRequest(new MissingParamError('email'))
    }
  }
}
