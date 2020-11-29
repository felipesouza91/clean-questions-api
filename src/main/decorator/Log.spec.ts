import { LogControllerDecorator } from './Log'
import { IHttpRequest, IHttpResponse, IController } from '@src/presentation/protocols'

import { ILogErrorRepository } from '@src/data/protocols/db/log/ILogErrorRepository'
import { serverError } from '@src/presentation/helpers/http/HttpHelper'
interface IISutTypes {
  sut: LogControllerDecorator
  controllerStub: IController
  logErrorRepositoryStub: ILogErrorRepository
}

const mockLogErrorRepository = (): ILogErrorRepository => {
  class LogErrorRepositoryStub implements ILogErrorRepository {
    async log (stack: string): Promise<void> {
      return await new Promise(resolve => resolve(null))
    }
  }
  return new LogErrorRepositoryStub()
}

const mockControllerStub = (): IController => {
  class ControllerStub implements IController {
    async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
      const httpResponse = {
        statusCode: 201,
        body: {
          name: 'teste'
        }
      }
      return await new Promise(resolve => resolve(httpResponse))
    }
  }
  return new ControllerStub()
}

const mockSut = (): IISutTypes => {
  const controllerStub = mockControllerStub()
  const logErrorRepositoryStub = mockLogErrorRepository()
  const sut = new LogControllerDecorator({
    controller: controllerStub,
    logErrorRepository: logErrorRepositoryStub
  })
  return {
    sut, controllerStub, logErrorRepositoryStub
  }
}

const mockFakeRequest = (): IHttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

describe('LogController Decorator', () => {
  test('Should call controller handle ', async () => {
    const { sut, controllerStub } = mockSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest = mockFakeRequest()
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  }
  )
  test('Should return the same result of the controller', async () => {
    const { sut } = mockSut()
    const httpRequest = mockFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 201,
      body: {
        name: 'teste'
      }
    })
  })
  test('Should call LogErrorRepository with correct error if controller return a server Error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = mockSut()
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    const error = serverError(fakeError)
    jest.spyOn(controllerStub, 'handle')
      .mockReturnValueOnce(new Promise(resolve => resolve(error)))
    const httpRequest = mockFakeRequest()
    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
