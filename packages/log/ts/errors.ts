import { IsoError, ModuleError } from 'iso-error'

export class StandardLogError extends ModuleError {
  constructor(description: string, options?: IsoError.Options) {
    super('standard-log', description, options)
  }
}
export class InvalidId extends StandardLogError {
  constructor(public id: string, options?: IsoError.Options) {
    super(`logger id only supports alphanumeric, unicode characters, and [:_-.]. Received ${id}`, options)
  }
}

export class InvalidEnvVar extends StandardLogError {
  constructor(public name: string, public value: string, public possibleValues: string[], options?: IsoError.Options) {
    super(`${name} contains invalid value '${value}'${` valid values: [${possibleValues.join()}]`}`, options)
  }
}
