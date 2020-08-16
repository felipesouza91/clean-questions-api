import { HttpResponse } from '../protocols/Http'
import { ServerError, UnauthorizedError } from '../erros'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}
export const serverError = (error: Error): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(error.stack)
  }
}
export const unauthorized = (): HttpResponse => {
  return {
    statusCode: 401,
    body: new UnauthorizedError()
  }
}
export const created = (object: any): HttpResponse => {
  return {
    statusCode: 201,
    body: object
  }
}

export const ok = (object: any): HttpResponse => {
  return {
    statusCode: 200,
    body: object
  }
}
