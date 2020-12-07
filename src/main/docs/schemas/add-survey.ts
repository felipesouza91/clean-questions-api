export const addSurveySchema = {
  title: 'Survey Input',
  type: 'object',
  properties: {
    question: {
      type: 'string'
    },
    answers: {
      type: 'array',
      items: {
        $ref: '#/schemas/answer'
      }
    }

  },
  required: ['question','answers']
}
