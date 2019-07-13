import { ModuleError } from 'iso-error'

export class StandardLogError extends ModuleError {
  constructor(description: string, ...errors: Error[]) {
    super('standard-log', description, ...errors)
  }
}
export class InvalidId extends StandardLogError {
  constructor(public id: string) {
    super(`logger id only supports alphanumeric, unicode characters, and [:_-.]. Received ${id}`)
  }
}

export class ProhibitedDuringProduction extends StandardLogError {
  constructor(public action: string) {
    super(`Cannot perform ${action} during production`)
  }
}
