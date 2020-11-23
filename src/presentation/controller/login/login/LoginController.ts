import { IController, IHttpRequest, IHttpResponse } from '@src/presentation/protocols'
import { badRequest, serverError, unauthorized, ok } from '@src/presentation/helpers/http/HttpHelper'

import { IAuthentication } from '@src/domain/usecases/IAuthentication'
import { IValidation } from '../signup/SignUpController.protocols'

interface ILoginControllerProps {
  validation: IValidation
  authentication: IAuthentication
}

export class LoginController implements IController {
  private readonly validation: IValidation
  private readonly authentication: IAuthentication
  constructor (props: ILoginControllerProps) {
    Object.assign(this, props)
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
