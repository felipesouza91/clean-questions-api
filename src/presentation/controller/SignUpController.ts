import { HttpRequest,HttpResponse } from '../protocols/Http'
import { MissingParamError } from '../erros/MissingParamError'
import { badRequest, serverError } from '../helpers/HttpHelper'
import { Controller } from '../protocols/Controller'
import { EmailValidator } from '../protocols/EmailValidator'
import { InvalidParamError } from '../erros/InvalidParamError'
import { ServerError } from '../erros/ServerError'
export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFilds = ['email', 'name', 'password', 'passwordConfirmation']
      const { body } = httpRequest
      for (const field of requiredFilds) {
        if (!body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError(new ServerError())
    }
  }
}
