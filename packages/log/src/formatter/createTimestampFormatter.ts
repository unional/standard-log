import ms from 'ms';

export type TimestampFormat = 'none' | 'iso' | 'elasped'

export function createTimestampFormatter(format: TimestampFormat) {
  switch (format) {
    case 'none':
      return (_timestamp: Date) => undefined
    case 'iso':
      return (timestamp: Date) => timestamp.toISOString()
    case 'elasped': {
      let lastTick: number | undefined = undefined
      return (timestamp: Date) => {
        const newTick = timestamp.getTime()
        const result = ms(lastTick === undefined ? 0 : newTick - lastTick)
        lastTick = newTick
        return result
      }
    }
  }
}
