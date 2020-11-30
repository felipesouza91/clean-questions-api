import { IAuthentication, IAuthenticationDTO } from '../controller/login/login/LoginController.protocols'

export const mockAuthentication = (): IAuthentication => {
  class AuthenticationSub implements IAuthentication {
    async auth (authenticationData: IAuthenticationDTO): Promise<string> {
      return 'any_token'
    }
  }
  return new AuthenticationSub()
}
