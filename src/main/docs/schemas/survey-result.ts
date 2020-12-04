
export const surveyResultSchema = {
  title: 'Survey Input',
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
      items: {
        $ref: '#/schemas/answerSurveyResult'
      }
    },
    date: {
      type: 'string',
      format: 'date'
    }
  }
}
