export function wrapAnsiId(id: string, codes: number[]) {
  return wrapAnsi(padIdIfHasBackground(id, codes), codes)
}
export function wrapAnsi(text: string, codes: number[]) {
  return `\u001B[${codes.join(';')}m${text}\u001B[0m`
}

function padIdIfHasBackground(id: string, codes: number[]) {
  return codes.some(x => x > 40) ? ` ${id} ` : id
}
