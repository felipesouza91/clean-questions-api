import { IAddSurvey, IAddSurveyDTO, IAddSurveyRepository } from './DbAddSurvey.protocols'

interface IDbAddSurveyProps {
  addSurveyRepository: IAddSurveyRepository
}

export class DbAddSurvey implements IAddSurvey {
  private readonly addSurveyRepository: IAddSurveyRepository

  constructor (props: IDbAddSurveyProps) {
    Object.assign(this, props)
  }

  async add (surveyData: IAddSurveyDTO): Promise<void> {
    await this.addSurveyRepository.add({ ...surveyData })
  }
}
