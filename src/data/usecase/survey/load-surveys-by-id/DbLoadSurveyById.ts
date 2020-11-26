import {
  ISurveyModel,
  ILoadSurveyById,
  ILoadSurveyByIdRepository
} from './DbLoadSurveyById.protocols'

interface IDbLoadSurveyByIdProps {
  loadSurveyRepository: ILoadSurveyByIdRepository
}

export class DbLoadSurveyById implements ILoadSurveyById {
  private readonly loadSurveyRepository: ILoadSurveyByIdRepository
  constructor (props: IDbLoadSurveyByIdProps) {
    Object.assign(this, props)
  }

  async loadById (id: string): Promise<ISurveyModel> {
    const survey = await this.loadSurveyRepository.loadById(id)
    return survey
  }
}
