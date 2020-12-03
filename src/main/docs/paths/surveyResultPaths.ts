export const surveyResultPaths = {
  put: {
    security: [
      {
        apiKeyAuth: []
      }
    ],
    tags: ['Login'],
    summary: 'API para Cadastrar a resposta de uma enquete',
    parameters: [{
      name: 'surveyId',
      in: 'path',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            title: 'Answer Input',
            type: 'object',
            properties: {
              answer: {
                type: 'string'
              }
            },
            required: ['answer']
          }

        }
      }
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/surveyResult'
            }
          }
        }
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
