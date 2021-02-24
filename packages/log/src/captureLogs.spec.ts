import a from 'assertron'
import delay from 'delay'
import { captureLogs, getLogger } from '.'
import { store } from './store'

describe('capture from logger', () => {
  test('gets empty object if no log are written', () => {
    const log = getLogger('capture')
    const [, actual] = captureLogs(log, () => { })

    expect(actual).toEqual([])
  })

  test('gets logs', () => {
    const log = getLogger('capture')
    const [, actual] = captureLogs(log, () => log.error('err msg'))

    a.satisfies(actual, [{ args: ['err msg'] }])
  })

  test('get logs for async block', async () => {
    const log = getLogger('capture')
    const [, actual] = await captureLogs(log, async () => {
      await delay(1)
      log.error('err msg')
    })
    a.satisfies(actual, [{ args: ['err msg'] }])
  })

  test('redirect is reset even if the block throws', () => {
    const log = getLogger('capture')
    a.throws(() => captureLogs(log, () => { throw new Error('some error') }))
    expect(store.value.redirects[log.id].length).toBe(0)
  })

  test('redirect is reset even if the block rejects', async () => {
    const log = getLogger('capture')
    await a.throws(() => captureLogs(log, async () => {
      await delay(1)
      throw new Error('some error')
    }))
    expect(store.value.redirects[log.id].length).toBe(0)
  })

  test('receive sync result', () => {
    const log = getLogger('capture')
    const [a] = captureLogs(log, () => 123)
    expect(a).toEqual(123)
  })
})
