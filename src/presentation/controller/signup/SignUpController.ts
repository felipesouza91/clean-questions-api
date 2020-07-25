import {
  HttpRequest,
  HttpResponse,
  Controller,
  EmailValidator,
  AddAccount
} from './SignUpProtocol'
import { MissingParamError, InvalidParamError } from '../../erros'
import { badRequest, serverError, created } from '../../helpers/HttpHelper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFilds = [
        'email',
        'name',
        'password',
        'passwordConfirmation'
      ]
      const { name, password, email, passwordConfirmation } = httpRequest.body

      for (const field of requiredFilds) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const object = await this.addAccount.add({ name, password, email })
      return created(object)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
