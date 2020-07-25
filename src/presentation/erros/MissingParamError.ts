export class MissingParamError extends Error {
  constructor (parramName: string) {
    super(`Missing param: ${parramName}`)
    this.name = parramName
  }
}
