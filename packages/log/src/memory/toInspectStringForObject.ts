export function toInspectStringForObject(inspect: (value: any) => string, value: any) {
  return typeof value === 'object' && value !== null ? inspect(value) : value
}
