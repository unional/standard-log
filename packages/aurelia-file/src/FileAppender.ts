import { logLevel } from 'aurelia-logging';
import fs from 'fs';
import path from 'path';
import { unpartial } from 'unpartial';
import uppercase from 'upper-case';
import { stringifyLogLevel } from './stringifyLogLevel';
import { store } from './store';

export type FormatMessage = (loggerId: string, logLevel: number, messages: any[]) => string
export type FileAppenderOptions = {
  format: string | FormatMessage,
  cwd: string
}
export class FileAppender {
  static addCustomLevel(name: string, level: number) {
    store.get().logLevelLookup.set(level, name);
    (FileAppender as any).prototype[name] = function (
      this: FileAppender,
      logger: { id: string },
      ...messages: any[]
    ) {
      this.appendToFile(logger.id, level, messages)
    }
  }
  filepath: string
  private format: FormatMessage
  constructor(public filename: string, options?: Partial<FileAppenderOptions>) {
    const { format, cwd } = unpartial<FileAppenderOptions>({
      format: '{id} {LEVEL} {messages}', cwd: process.cwd()
    }, options)

    this.format = createFormatFunc(format)
    this.filepath = path.resolve(cwd, filename)
  }

  debug(logger: { id: string }, ...messages: any[]) {
    this.appendToFile(logger.id, logLevel.debug, messages)
  }
  info(logger: { id: string }, ...messages: any[]) {
    this.appendToFile(logger.id, logLevel.info, messages)
  }
  warn(logger: { id: string }, ...messages: any[]) {
    this.appendToFile(logger.id, logLevel.warn, messages)
  }
  error(logger: { id: string }, ...messages: any[]) {
    this.appendToFile(logger.id, logLevel.error, messages)
  }
  private appendToFile(id: string, level: number, messages: any[]) {
    fs.appendFileSync(this.filepath, this.format(id, level, messages) + '\n')
  }
}

function createFormatFunc(format: string | FormatMessage): FormatMessage {
  if (typeof format === 'function') return format
  return (id: string, level: number, messages: any[]) => {
    const lvl = stringifyLogLevel(level)
    return format
      .replace('{id}', id)
      .replace('{ID}', uppercase(id))
      .replace('{level}', lvl)
      .replace('{LEVEL}', uppercase(lvl))
      .replace('{messages}', messages.join())
  }
}
