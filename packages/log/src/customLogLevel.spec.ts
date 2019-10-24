import { addCustomLogLevel, clearCustomLogLevel, getCustomLevels, logLevels } from '.';

describe('clearCustomLogLevel()', () => {
  test('clear all custom levels', () => {
    addCustomLogLevel('c1', logLevels.none + 1)
    addCustomLogLevel('c2', logLevels.none + 2)
    expect(getCustomLevels().length).toBe(2)

    clearCustomLogLevel()

    expect(getCustomLevels().length).toBe(0)
  })
})
