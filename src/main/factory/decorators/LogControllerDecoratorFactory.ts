import { LogMongoRepository } from '@src/infra/db/mongodb/log-repository/Log'
import { IController } from '@src/presentation/protocols'
import { LogControllerDecorator } from '@src/main/decorator/Log'

export const makeLogControllerDecorator = (controller: IController): IController => {
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator({ controller, logErrorRepository })
}
