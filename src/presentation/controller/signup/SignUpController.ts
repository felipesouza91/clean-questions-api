import {
  HttpRequest,
  HttpResponse,
  Controller,
  EmailValidator,
  AddAccount
} from './SignUp.protocols'
import { MissingParamError, InvalidParamError } from '../../erros'
import { badRequest, serverError, created } from '../../helpers/HttpHelper'
import { Validation } from '../../helpers/validators/Validation'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount
  private readonly validation: Validation

  constructor (emailValidator: EmailValidator, addAccount: AddAccount,validation: Validation) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(httpRequest.body)
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
      return serverError(error)
    }
  }
}
