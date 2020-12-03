import {
  loginPath,
  surveyPath,
  signupPath
} from './paths'
import {
  accountSchema,
  loginSchema ,
  errorSchema,
  answerSchema,
  surveySchema ,
  apiKeyAuthSchema,
  signUpSchema
} from './schemas'
import {
  badRequest,
  serverError,
  unauthorized,
  notFound ,
  forbidden
} from './components'

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
    { name: 'Login' },
    { name: 'Survey' }
  ],
  paths: {
    '/login': loginPath,
    '/survey': surveyPath,
    '/signup': signupPath
  },
  schemas: {
    account: accountSchema,
    login: loginSchema,
    error: errorSchema,
    survey: surveySchema,
    answer: answerSchema,
    signup: signUpSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    serverError,
    unauthorized,
    notFound,
    forbidden
  }
}
