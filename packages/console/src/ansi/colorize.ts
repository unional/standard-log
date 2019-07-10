export function colorizeId(id: string, codes: number[]) {
  return colorize(padIdIfHasBackground(id, codes), codes)
}
export function colorize(text: string, codes: number[]) {
  return `\u001B[${codes.join(';')}m${text}\u001B[0m`
}

function padIdIfHasBackground(id: string, codes: number[]) {
  return codes.some(x => x > 40) ? ` ${id} ` : id
}
