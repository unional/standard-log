export class InvalidId extends Error {
  constructor(public id: string) {
    super(`logger id only supports alphanumeric, unicode characters, and [:_-.]. Received ${id}`)
  }
}
