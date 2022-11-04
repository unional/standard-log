import type { LogReporter, LogReporterOptions } from 'standard-log'
import { ctx } from './crreateRemoteLogReporter.ctx.js'

export type RemoteLogReporterOptions = LogReporterOptions<string> & {
  url: string,
  requestInit?: Omit<RequestInit, 'body'>
}

export function createRemoteLogReporter(options: RemoteLogReporterOptions): LogReporter {
  const { id = 'remote',
    formatter = e => JSON.stringify(e),
    filter,
    url,
    requestInit } = options

  return {
    id,
    isConsoleReporter: false,
    get formatter() { return formatter },
    get filter() { return filter },
    write(entry) {
      if (filter && !filter(entry)) return
      const body = formatter(entry)
      ctx.fetch(url, { body, ...requestInit }).catch((err) => {
        console.warn(`unable to send log to ${url}:`, err)
      })
    }
  }
}
