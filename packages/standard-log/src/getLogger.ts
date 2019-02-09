import { InvalidId } from './errors';

export function getLogger(id: string) {
  validateId(id)
}

function validateId(id: string) {
  if (/[`~!@#$%^&*()=+\[\]{}\\\/,|<>\?]/.test(id)) throw new InvalidId(id)
}
