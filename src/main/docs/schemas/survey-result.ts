
export const surveyResultSchema = {
  title: 'Survey Result',
  type: 'object',
  properties: {
    surveyId: {
      type: 'string'
    },
    accountId: {
      type: 'string'
    },
    answers: {
      type: 'array',
      item: {
        $ref: '#/schemas/answerSurveyResult'
      }
    },
    date: {
      type: 'string',
      format: 'date'
    }
  }
}
