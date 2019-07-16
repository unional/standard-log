import { addCustomLogLevel, clearCustomLogLevel, getCustomLevels, logLevel } from '..';

describe('clearCustomLogLevel()', () => {
  test('clear all custom levels', () => {
    addCustomLogLevel('c1', logLevel.none + 1)
    addCustomLogLevel('c2', logLevel.none + 2)
    expect(getCustomLevels().length).toBe(2)

    clearCustomLogLevel()

    expect(getCustomLevels().length).toBe(0)
  })
})
