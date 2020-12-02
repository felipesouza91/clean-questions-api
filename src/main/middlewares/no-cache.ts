
import { Request, Response, NextFunction } from 'express'
export const noCache = (request: Request, response: Response, next: NextFunction): void => {
  response.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  response.set('Progma', 'no-cache')
  response.set('Expires', '0')
  response.set('Surrogate-Control', 'no-store')
  next()
}
