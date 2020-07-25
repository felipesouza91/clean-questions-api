export class InvalidParamError extends Error {
  constructor (parramName: string) {
    super(`Invalid param: ${parramName}`)
    this.name = 'InvalidParamError'
  }
}
