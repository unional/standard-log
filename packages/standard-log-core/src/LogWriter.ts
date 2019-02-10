export type LogWriter<T extends string> = {
  [k in T]: (logger: { id: string }, messages: any[]) => void
}
