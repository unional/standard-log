export function rangeEntries(expected: string, values: number[]) {
	return values.map(value => [value, expected] as const)
}
