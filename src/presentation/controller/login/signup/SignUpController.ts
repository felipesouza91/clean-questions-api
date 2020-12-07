import {
  IHttpRequest,
  IHttpResponse,
  IController,
  IAddAccount,
  IAuthentication,
  IValidation
} from './SignUpController.protocols'

import { badRequest, serverError, created, forbidden } from '@src/presentation/helpers/http/HttpHelper'
import { EmailInUseError } from '@src/presentation/erros'

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
      const account = await this.addAccount.add({ name, password, email })
      if (!account) {
        return forbidden(new EmailInUseError())
      }
      const authenticationModel = await this.authentication.auth({ email, password })
      return created({ ...authenticationModel })
    } catch (error) {
      return serverError(error)
    }
  }
}
