import { HttpRequest,HttpResponse, Controller, EmailValidator } from '../protocols'
import { MissingParamError, InvalidParamError } from '../erros'
import { badRequest, serverError } from '../helpers/HttpHelper'

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
      if (body.password !== body.passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
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
