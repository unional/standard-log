import { LogFormatter } from 'standard-log-core';

export type ConsoleMethods = 'error' | 'warn' | 'info' | 'debug'

export type ColorOptions = {
  /**
   * How many colors available.
   * Recommend at least 10.
   */
  maxColor: number

  /**
   * By default, `ColorAppender` will color the background of the logger ID.
   * If this is set to true, then the text of the ID will be colored instead.
   * Currently this only have effect on NodeJS environment.
   */
  coloringText: boolean
}

export type ConsoleFormatter = LogFormatter<string[]>

export type Console = {
  debug: (message?: any, ...optionalParams: any[]) => void;
  info: (message?: any, ...optionalParams: any[]) => void;
  warn: (message?: any, ...optionalParams: any[]) => void;
  error: (message?: any, ...optionalParams: any[]) => void;
}
