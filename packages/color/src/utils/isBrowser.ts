export function isBrowser() {
  const p: any = process
  // tslint:disable-next-line: strict-type-predicates
  return (typeof process === 'undefined' || p.type === 'renderer' || p.browser === true || p.__nwjs)
}
