export type LogWriter = {
  write(logger: { id: string }, level: number, messages: any[]): void
}
