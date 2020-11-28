import { IController, IHttpRequest } from '@src/presentation/protocols'
import { Request, Response } from 'express'
export const adaptRoute = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      body: req.body,
      headers: req.headers,
      params: req.params,
      accountId: req.accountId
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      res
        .status(httpResponse.statusCode)
        .json({ error: httpResponse.body.message })
    } else {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}
