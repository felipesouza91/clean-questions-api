import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { badRequest } from '../../helpers/HttpHelper'
import { MissingParamError, InvalidParamError } from '../../erros'
import { EmailValidator } from '../signup/SignUp.protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body

    if (!email) {
      return await new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
    }
    if (!password) {
      return await new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
    }
    const emailIsValid = this.emailValidator.isValid(email)
    if (!emailIsValid) {
      return await new Promise(resolve => resolve(badRequest(new InvalidParamError('email'))))
    }
    return await new Promise(resolve => resolve(null))
  }
}
