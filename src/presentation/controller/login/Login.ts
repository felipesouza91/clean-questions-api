import { IController, IHttpRequest, IHttpResponse } from '../../protocols'
import { badRequest, serverError, unauthorized, ok } from '../../helpers/http/HttpHelper'

import { IAuthentication } from '../../../domain/usecases/IAuthentication'
import { IValidation } from '../signup/SignUp.protocols'

export class LoginController implements IController {
  private readonly validation: IValidation
  private readonly authentication: IAuthentication
  constructor (validation: IValidation,authentication: IAuthentication) {
    this.validation = validation
    this.authentication = authentication
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { email, password } = httpRequest.body
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const accessToken = await this.authentication.auth({ email,password })
      if (!accessToken) {
        return unauthorized()
      }
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
