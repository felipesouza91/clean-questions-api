
import { IAddSurveyResultDTO } from '@src/domain/usecases/survey-result/ISaveSurveyResult'

export interface ISaveSurveyResultRepository {
  save: (data: IAddSurveyResultDTO) => Promise<void>
}
