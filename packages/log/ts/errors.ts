import { IsoError, ModuleError } from 'iso-error'

/**
 * @deprecated No longer used since 11.2.0
 */
export class StandardLogError extends ModuleError {
	constructor(description: string, options?: IsoError.Options) {
		super('standard-log', description, options)
	}
}

/**
 * @deprecated no longer used since 11.2.0
 */
export class InvalidId extends StandardLogError {
	constructor(public id: string, options?: IsoError.Options) {
		super(`logger id only supports alphanumeric, unicode characters, and [:_-.]. Received ${id}`, options)
	}
}
