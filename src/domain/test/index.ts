import { IAccountModel } from '../models/IAccountModel'
import { ISurveyModel } from '../models/ISurveyModel'
import { ISurveyResultModel } from '../models/ISurveyResultModel'
import { IAddAccountDTO } from '../usecases/account/IAddAccount'
import { IAddSurveyResultDTO } from '../usecases/survey-result/ISaveSurveyResult'
import { IAddSurveyDTO } from '../usecases/survey/IAddSurvey'

export const mockFakeAccount = (): IAccountModel => ({
  id: 'any_id',
  email: 'any_email@mail.com',
  name: 'Any Name',
  password: 'hashed_password'
})

export const mockFakeAccountDTO = (): IAddAccountDTO => ({
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password'
})

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

export const mockFakeAddSurveyResultDTO = (): IAddSurveyResultDTO => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_anser',
  date: new Date()
})

export const mockFakeSurveyResultModel = (): ISurveyResultModel => ({
  id: 'any_id',
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_anser',
  date: new Date()
})
