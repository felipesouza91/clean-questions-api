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
  surveyId: 'survey_id',
  question: 'any_question',
  answers: [
    {
      answer: 'any_answer',
      count: 10,
      percent: 10
    }
  ],
  date: new Date()
})
