// istanbul ignore next
export function semverGt(versionString: string, version: [number, number, number]) {
  const actual = versionString.split('.').reverse().reduce((p, v, i) => {
    p += Number.parseInt(v, 10) * Math.pow(100, i)
    return p
  }, 0)

  return actual > (version[0] * 10000 + version[1] * 100 + version[2])
}
