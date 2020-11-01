export interface IAuthenticationModel {
  email: string
  password: string
}

export interface IAuthentication {
  auth: (authenticationData: IAuthenticationModel) => Promise<string>
}
