import { AuthMiddleware } from './AuthMiddleware'
import { forbidden } from '../helpers/http/HttpHelper'
import { AccessDeniedError } from '../erros'
describe('AuthMiddleware', () => {
  test('Should return 403 if no x-access-token is exists in headers', async () => {
    const sut = new AuthMiddleware()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
