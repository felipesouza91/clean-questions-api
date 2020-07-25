import { HttpResponse } from '../protocols/Http'
import { ServerError } from '../erros'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}
export const serverError = (): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError()
  }
}
export const created = (object: any): HttpResponse => {
  return {
    statusCode: 201,
    body: object
  }
}
