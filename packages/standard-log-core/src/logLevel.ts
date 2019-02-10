export const logLevel = {
  emergency: 10,
  alert: 20,
  critical: 30,
  error: 40,
  warn: 50,
  notice: 60,
  info: 70,
  debug: 80,
  trace: 90
}

export type LogLevel = ReturnType<typeof toLogLevel>

export function toLogLevel(level: number) {
  switch (true) {
    case (level < 20):
      return 'emergency'
    case (level < 30):
      return 'alert'
    case (level < 40):
      return 'critical'
    case (level < 50):
      return 'error'
    case (level < 60):
      return 'warn'
    case (level < 70):
      return 'notice'
    case (level < 80):
      return 'info'
    case (level < 90):
      return 'debug'
    default:
      return 'trace'
  }
}
