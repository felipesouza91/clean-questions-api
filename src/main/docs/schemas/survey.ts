export const surveySchema = {
  title: 'Survey',
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    question: {
      type: 'string'
    },
    answers: {
      type: 'array',
      items: {
        $ref: '#/schemas/answer'
      }
    },
    date: {
      type: 'string',
      format: 'date'
    }
  }
}
