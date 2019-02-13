import { addCustomLogLevel, clearCustomLogLevel, getCustomLevels, LogLevelEntry, onAddCustomLogLevel } from '.';

describe('clearCustomLogLevel()', () => {
  test('clear all custom levels', () => {
    addCustomLogLevel('c1', 1)
    addCustomLogLevel('c2', 2)
    expect(getCustomLevels().length).toBe(2)

    clearCustomLogLevel()

    expect(getCustomLevels().length).toBe(0)
  })
})

describe('onAddCustomLogLevel()', () => {
  test('trigger listener on add', () => {
    let actual: LogLevelEntry
    onAddCustomLogLevel(entry => actual = entry)

    addCustomLogLevel('add-listener', 777)

    expect(actual!).toEqual({ name: 'add-listener', level: 777 })
  })

  test('unsubscribe listener', () => {
    const sub = onAddCustomLogLevel(() => { throw new Error('should not reach') })
    sub.unsubscribe()
    addCustomLogLevel('unsub', 788)
  })

  test('unsubscribe again has no effect', () => {
    const sub = onAddCustomLogLevel(() => { throw new Error('should not reach') })
    sub.unsubscribe()
    sub.unsubscribe()
    addCustomLogLevel('unsub2', 788)
  })
})
