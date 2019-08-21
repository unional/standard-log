import { logLevel } from 'standard-log';
import { createSyslogFormatter } from '.';

const formatter = createSyslogFormatter({ facility: 0, version: 1 })
const timestamp = new Date()

test('string argument', () => {
  const actual = formatter({ id: 'log', level: logLevel.critical, timestamp, args: ['string value'] })

  expect(actual).toEqual(`<2>1 ${timestamp.toISOString()} - - - - - ["string value"]`)
})

test('non string and object values', () => {
  const actual = formatter({ id: 'log', level: logLevel.critical, timestamp, args: [true, 1, undefined, null] })

  expect(actual).toEqual(`<2>1 ${timestamp.toISOString()} - - - - - [true,1,null,null]`)
})

test('object', () => {
  const actual = formatter({ id: 'log', level: logLevel.critical, timestamp, args: [{ a: 1, b: 'b' }] })

  expect(actual).toEqual(`<2>1 ${timestamp.toISOString()} - - - - - [{"a":1,"b":"b"}]`)
})
