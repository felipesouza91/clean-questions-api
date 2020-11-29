export interface IAuthenticationDTO {
  email: string
  password: string
}

export interface IAuthentication {
  auth: (authenticationData: IAuthenticationDTO) => Promise<string>
}
