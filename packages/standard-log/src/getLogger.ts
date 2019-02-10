import { InvalidId } from './errors';
import { Logger } from './interfaces';
import { LogLevel } from 'standard-log-core';

export function getLogger<T extends LogLevel>(id: string): Logger<T> {
  validateId(id)
  return {} as any
}

function validateId(id: string) {
  if (/[`~!@#$%^&*()=+\[\]{}\\\/,|<>\?]/.test(id)) throw new InvalidId(id)
}
