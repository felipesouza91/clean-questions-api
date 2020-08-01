import request from 'supertest'
import app from '../config/app'

describe('ContentType Middlewares', () => {
  test('Should return default content type as json', async () => {
    app.post('/test_contet_type', (req, res) => {
      res.send()
    })
    await request(app)
      .post('/test_contet_type')
      .expect('content-type', /json/)
  })

  test('Should retur xml content type whem forced', async () => {
    app.post('/test_xml_type', (req, res) => {
      res.type('xml')
      res.send()
    })
    await request(app)
      .post('/test_xml_type')
      .expect('content-type', /xml/)
  })
})
