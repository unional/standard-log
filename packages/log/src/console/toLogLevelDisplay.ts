import uppercase from 'upper-case';
import { toLogLevelName } from '../log-level';

export function toLogLevelDisplay(level: number) {
  return `(${uppercase(toLogLevelName(level))})`
}
