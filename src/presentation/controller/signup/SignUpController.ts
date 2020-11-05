import {
  IHttpRequest,
  IHttpResponse,
  IController,
  IAddAccount,
  IAuthentication
} from './SignUpController.protocols'

import { badRequest, serverError, ok } from '../../helpers/http/HttpHelper'
import { IValidation } from '../../protocols/IValidation'

interface ISignUpControllerProps {
  addAccount: IAddAccount
  validation: IValidation
  authentication: IAuthentication
}

export class SignUpController implements IController {
  private readonly addAccount: IAddAccount
  private readonly validation: IValidation
  private readonly authentication: IAuthentication
  constructor (props: ISignUpControllerProps) {
    Object.assign(this, props)
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, password, email } = httpRequest.body
      await this.addAccount.add({ name, password, email })
      const accessToken = await this.authentication.auth({ email, password })
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
