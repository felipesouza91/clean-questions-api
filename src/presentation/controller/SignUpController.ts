import { HttpRequest,HttpResponse } from '../protocols/Http'
import { MissingParamError } from '../erros/MissingParamError'
import { badRequest } from '../helpers/HttpHelper'
export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFilds = ['email', 'name']
    const { body } = httpRequest
    for (const field of requiredFilds) {
      if (!body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
