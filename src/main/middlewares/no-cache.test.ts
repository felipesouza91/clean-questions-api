import app from '../config/app'
import { noCache } from '../middlewares/no-cache'
import request from 'supertest'
describe('No Cache Middlewares', () => {
  test('Should disable cache', async () => {
    app.get('/test_nocache', noCache, (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_nocache')
      .expect('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('Progma', 'no-cache')
      .expect('Expires', '0')
      .expect('Surrogate-Control', 'no-store')
  })
})
