export interface IUpdateAccessTokenRepository {
  update: (id: string, accessToken: string) => Promise<void>
}
