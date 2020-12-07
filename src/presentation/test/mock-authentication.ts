
import { IAuthenticationModel } from '@src/domain/models/IAuthenticationModel'
import { IAuthentication, IAuthenticationDTO } from '../controller/login/login/LoginController.protocols'

export const mockAuthentication = (): IAuthentication => {
  class AuthenticationSub implements IAuthentication {
    async auth (authenticationData: IAuthenticationDTO): Promise<IAuthenticationModel> {
      return {
        accessToken: 'any_token',
        name: 'Any Name'
      }
    }
  }
  return new AuthenticationSub()
}
