import { IHttpResponse } from '../../protocols/IHttp'
import { ServerError, UnauthorizedError } from '../../erros'

export const badRequest = (error: Error): IHttpResponse => {
  return {
    statusCode: 400,
    body: { error: error.message }
  }
}
export const forbidden = (error: Error): IHttpResponse => {
  return {
    statusCode: 400,
    body: { error: error.message }
  }
}
export const serverError = (error: Error): IHttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(error.stack)
  }
}
export const unauthorized = (): IHttpResponse => {
  return {
    statusCode: 401,
    body: new UnauthorizedError()
  }
}

export const created = (object: any): IHttpResponse => {
  return {
    statusCode: 201,
    body: object
  }
}
export const noContent = (): IHttpResponse => {
  return {
    statusCode: 204,
    body: null
  }
}

export const ok = (object: any): IHttpResponse => {
  return {
    statusCode: 200,
    body: object
  }
}
