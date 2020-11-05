export class EmailInUseError extends Error {
  constructor () {
    super('Email in use error')
    this.name = 'EmailInUseError'
  }
}
