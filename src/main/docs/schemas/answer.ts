export const answerSchema = {
  title: 'Answer',
  type: 'object',
  properties: {
    image: {
      type: 'string'
    },
    answer: {
      type: 'string'
    }
  },
  required: ['answer']
}
