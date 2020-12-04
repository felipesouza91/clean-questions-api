
export const answerSurveyResultSchema = {
  title: 'Answer Survey Result',
  type: 'object',
  properties: {
    image: {
      type: 'string'
    },
    answer: {
      type: 'string'
    },
    count: {
      type: 'string'
    },
    percent: {
      type: 'string'
    }
  }
}
