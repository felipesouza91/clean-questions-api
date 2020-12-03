import { loginPath } from './paths'
import { accountSchema, loginSchema , errorSchema } from './schemas'
import { badRequest, serverError, unauthorized, notFound } from './components'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node Api',
    description: 'Api do curso do mango para realizar enquetes entre programadores',
    version: '2.2.0'
  },
  license: {
    name: 'GPL 3.0',
    url: 'https://choosealicense.com/licenses/gpl-3.0/'
  },
  servers: [
    {
      url: '/api'
    }
  ],
  tags: [
    { name: 'Login' }
  ],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    login: loginSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    serverError,
    unauthorized,
    notFound
  }
}
