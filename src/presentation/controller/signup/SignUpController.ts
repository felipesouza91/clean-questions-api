import {
  HttpRequest,
  HttpResponse,
  Controller,
  AddAccount
} from './SignUp.protocols'

import { badRequest, serverError, created } from '../../helpers/HttpHelper'
import { Validation } from '../../helpers/validators/Validation'

export class SignUpController implements Controller {
  private readonly addAccount: AddAccount
  private readonly validation: Validation

  constructor (addAccount: AddAccount,validation: Validation) {
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, password, email } = httpRequest.body
      const object = await this.addAccount.add({ name, password, email })
      return created(object)
    } catch (error) {
      return serverError(error)
    }
  }
}
