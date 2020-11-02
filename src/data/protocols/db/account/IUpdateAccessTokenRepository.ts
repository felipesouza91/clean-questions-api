export interface IUpdateAccessTokenRepository {
  updateAccessToken: (id: string, accessToken: string) => Promise<void>
}
