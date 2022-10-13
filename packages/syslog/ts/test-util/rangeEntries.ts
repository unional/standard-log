import { range } from 'ramda'

export function rangeEntries(start: number, end: number, expected: any) {
  return range(start, end).map(value => ([value, expected]))
}
