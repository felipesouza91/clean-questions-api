import { IAuthenticationModel } from '@src/domain/models/IAuthenticationModel'
export interface IAuthenticationDTO {
  email: string
  password: string
}

export interface IAuthentication {
  auth: (authenticationData: IAuthenticationDTO) => Promise<IAuthenticationModel>
}
