import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { badRequest, serverError, unauthorized, ok } from '../../helpers/HttpHelper'
import { MissingParamError, InvalidParamError } from '../../erros'
import { EmailValidator } from '../signup/SignUp.protocols'
import { Authentication } from '../../../domain/usecases/Authentication'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication
  constructor (emailValidator: EmailValidator,authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      const requiredFilds = [
        'email',
        'password'
      ]

      for (const field of requiredFilds) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const emailIsValid = this.emailValidator.isValid(email)
      if (!emailIsValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const accessToken = await this.authentication.auth(email,password)
      if (!accessToken) {
        return unauthorized()
      }
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
