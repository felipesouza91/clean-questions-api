import { IController, IHttpRequest, IHttpResponse } from '../../presentation/protocols'
import { ILogErrorRepository } from '../../data/protocols/db/log/ILogErrorRepository'

interface ILogControllerDecoratorProps {
  controller: IController
  logErrorRepository: ILogErrorRepository
}
export class LogControllerDecorator implements IController {
  private readonly controller: IController
  private readonly logErrorRepository: ILogErrorRepository
  constructor (props: ILogControllerDecoratorProps) {
    Object.assign(this, props)
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const response = await this.controller.handle(httpRequest)
    if (response.statusCode === 500) {
      await this.logErrorRepository.log(response.body.stack)
    }
    return response
  }
}
