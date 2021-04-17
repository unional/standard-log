export type LogEntry = {
  id: string,
  level: number,
  // args instead of messages because it is `any[]` instead of `string[]`
  args: any[],
  timestamp: Date
}

export const LogEntry = {
  create(id: string, level: number, ...args: any[]) {
    return {
      id,
      level,
      args,
      timestamp: new Date()
    }
  }
}
