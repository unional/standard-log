import { LogEntry } from 'standard-log'
import { toSyslogLevel } from './syslog'

export type SyslogFormatterOptions = {
  facility: number,
  version: number,
  hostname?: string,
  appname?: string,
  procid?: string,
  msgid?: string
}

export function createSyslogFormatter({ facility, version, hostname = '-', appname = '-', procid = '-', msgid = '-' }: SyslogFormatterOptions) {
  return function (entry: LogEntry) {
    return `<${toPriorityValue(facility, toSyslogLevel(entry.level))}>${version} ${entry.timestamp.toISOString()} ${hostname} ${appname} ${procid} ${msgid} - ${JSON.stringify(entry.args)}`
  }
}

function toPriorityValue(facility: number, syslogLevel: number) {
  return facility * 8 + syslogLevel
}
