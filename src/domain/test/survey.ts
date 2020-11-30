import { ISurveyModel } from '../models/ISurveyModel'
import { ISurveyResultModel } from '../models/ISurveyResultModel'
import { IAddSurveyDTO } from '../usecases/survey/IAddSurvey'

export const mockFakeSurveyDTO = (): IAddSurveyDTO => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer'
    }
  ],
  date: new Date()
})

export const mockFakeSurveysList = (): ISurveyModel[] => {
  return [{ id: 'any-id', question: 'Question', answers: [{ answer: 'true' }], date: new Date() }]
}

export const mockFakeSurvey = (): ISurveyModel => ({
  id: 'any_id',
  question: 'Question',
  answers: [{ answer: 'true' }],
  date: new Date()
})

export const mockFakeSurveyResultModel = (): ISurveyResultModel => ({
  id: 'any_id',
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_anser',
  date: new Date()
})
