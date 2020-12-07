import {
  loginPath,
  surveyPath,
  signupPath,
  surveyResultPaths
} from './paths'
import {
  accountSchema,
  loginSchema ,
  errorSchema,
  answerSchema,
  surveySchema ,
  apiKeyAuthSchema,
  signUpSchema,
  addSurveySchema,
  surveyResultSchema,
  answerSurveyResultSchema
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
    '/surveys': surveyPath,
    '/signup': signupPath,
    '/surveys/{surveyId}/results': surveyResultPaths
  },
  schemas: {
    account: accountSchema,
    login: loginSchema,
    error: errorSchema,
    survey: surveySchema,
    answer: answerSchema,
    signup: signUpSchema,
    addSurvey: addSurveySchema,
    surveyResult: surveyResultSchema,
    answerSurveyResult: answerSurveyResultSchema
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
