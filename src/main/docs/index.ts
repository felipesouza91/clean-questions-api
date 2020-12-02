import { loginPath } from './paths/loginPaths'
import { accountSchema, loginSchema } from './schemas'
export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node Api',
    description: 'Api do curso do mango para realizar enquetes entre programadores',
    version: '2.2.0'
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
    login: loginSchema
  }
}
