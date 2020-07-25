import { HttpResponse } from '../protocols/Http'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}
export const serverError = (error: Error): HttpResponse => {
  return {
    statusCode: 500,
    body: error
  }
}
export const created = (object: any): HttpResponse => {
  return {
    statusCode: 201,
    body: object
  }
}
