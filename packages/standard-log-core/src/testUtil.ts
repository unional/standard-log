import R from 'ramda';

export function rangeEntries(start: number, end: number, expected: any) {
  return R.range(start, end).map(level => ([level, expected]))
}
