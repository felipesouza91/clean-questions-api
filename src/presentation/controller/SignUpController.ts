import { HttpRequest,HttpResponse } from '../protocols/Http'
import { MissingParamError } from '../erros/MissingParamError'
import { badRequest } from '../helpers/HttpHelper'
import { Controller } from '../protocols/Controller'
export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFilds = ['email', 'name', 'password', 'passwordConfirmation']
    const { body } = httpRequest
    for (const field of requiredFilds) {
      if (!body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
