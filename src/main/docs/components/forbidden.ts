export const forbidden = {
  description: 'Sem permissão',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
