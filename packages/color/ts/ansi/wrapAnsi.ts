export function wrapAnsi(text: string, codes: number[]) {
	return `\u001B[${codes.join(';')}m${text}\u001B[0m`
}
