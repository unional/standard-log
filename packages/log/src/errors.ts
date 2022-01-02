import { IsoError, ModuleError } from 'iso-error'

export class StandardLogError extends ModuleError {
  constructor(description: string, options?: IsoError.Options) {
    super('standard-log', description, options)
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

export class InvalidEnvVar extends StandardLogError {
  constructor(public name: string, public value: string, public possibleValues: string[]) {
    super(`${name} contains invalid value '${value}'${` valid values: [${possibleValues.join()}]`}`)
  }
}
