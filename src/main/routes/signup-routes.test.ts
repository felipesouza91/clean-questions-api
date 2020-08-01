import request from 'supertest'
import app from '../config/app'

describe('SingUp Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_passsword',
        passwordConfirmation: 'any_password'
      })
      .expect(200)
  })
})
