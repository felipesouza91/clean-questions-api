import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/Log'
import { IController } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorator/Log'

export const makeLogControllerDecorator = (controller: IController): IController => {
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator({ controller, logErrorRepository })
}
