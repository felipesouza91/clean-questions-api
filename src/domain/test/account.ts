import { IAccountModel } from '../models/IAccountModel'
import { IAddAccountDTO } from '../usecases/account/IAddAccount'
import { IAddSurveyResultDTO } from '../usecases/survey-result/ISaveSurveyResult'

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

export const mockFakeAddSurveyResultDTO = (): IAddSurveyResultDTO => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_anser',
  date: new Date()
})
