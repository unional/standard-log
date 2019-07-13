import { addCustomLogLevel, clearCustomLogLevel, getCustomLevels, LogLevelEntry, onAddCustomLogLevel } from '.';
import { logLevel } from '../lib';

describe('clearCustomLogLevel()', () => {
  test('clear all custom levels', () => {
    addCustomLogLevel('c1', logLevel.none + 1)
    addCustomLogLevel('c2', logLevel.none + 2)
    expect(getCustomLevels().length).toBe(2)

    clearCustomLogLevel()

    expect(getCustomLevels().length).toBe(0)
  })
})

describe('onAddCustomLogLevel()', () => {
  test('trigger listener on add', () => {
    let actual: LogLevelEntry
    onAddCustomLogLevel(entry => actual = entry)

    const level = logLevel.info + 77
    addCustomLogLevel('add-listener', level)

    expect(actual!).toEqual({ name: 'add-listener', level })
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
