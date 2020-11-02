import { IController, IHttpRequest, IHttpResponse } from '../../presentation/protocols'
import { ILogErrorRepository } from '../../data/protocols/db/log/ILogErrorRepository'

export class LogControllerDecorator implements IController {
  private readonly controller: IController
  private readonly logErrorRepository: ILogErrorRepository
  constructor (controller: IController, logErrorRepository: ILogErrorRepository) {
    this.controller = controller
    this.logErrorRepository = logErrorRepository
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const response = await this.controller.handle(httpRequest)
    if (response.statusCode === 500) {
      await this.logErrorRepository.log(response.body.stack)
    }
    return response
  }
}
