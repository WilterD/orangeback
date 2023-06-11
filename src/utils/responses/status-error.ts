export default class StatusError extends Error {
  constructor (message: string, private readonly statusCode: number) {
    super(message)
    Object.setPrototypeOf(this, StatusError.prototype)
  }

  getStatus (): number {
    return this.statusCode
  }
}
