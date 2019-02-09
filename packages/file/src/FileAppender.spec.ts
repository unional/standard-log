import fs from 'fs';
import path from 'path';
import { FileAppender, stringifyLogLevel } from '.';
import { ensureNotExist, resolvePath } from './testUtil';

test('by default file is located at process.cwd()', () => {
  const f = new FileAppender('x.log')
  expect(f.filepath).toBe(path.resolve(process.cwd(), 'x.log'))
})

test('can override cwd with absolute path', () => {
  const f = new FileAppender('x.log', { cwd: path.resolve('fixtures/abc') })
  expect(f.filepath).toBe(path.resolve('fixtures/abc', 'x.log'))
})

test('can override cwd with relative path', () => {
  const f = new FileAppender('x.log', { cwd: 'fixtures/relative' })
  expect(f.filepath).toBe(path.resolve('fixtures/relative', 'x.log'))
})

test('file will be created', () => {
  ensureNotExist('fixtures/no-file/x.log')

  const cwd = resolvePath('fixtures/no-file')
  const f = new FileAppender('x.log', { cwd })
  f.error({ id: 'l1' }, 'test')
  expect(fs.existsSync(path.resolve(cwd, 'x.log'))).toBe(true)
})

test('customize format using template', () => {
  ensureNotExist('fixtures/format/x.log')

  const cwd = resolvePath('fixtures/format')
  const f = new FileAppender('x.log', { format: '{id}({LEVEL}): {messages}', cwd })
  const logger = { id: 'log' }
  f.error(logger, 'error')
  f.warn(logger, 'warn')
  f.info(logger, 'info')
  f.debug(logger, 'debug')

  const actual = fs.readFileSync(f.filepath, 'utf-8')
  expect(actual).toBe(`log(ERROR): error
log(WARN): warn
log(INFO): info
log(DEBUG): debug
`)
})

test('customize format using function', () => {
  ensureNotExist('fixtures/format-fn/x.log')

  const cwd = resolvePath('fixtures/format-fn')
  const f = new FileAppender('x.log', {
    format: (id, level, messages) => {
      return `${id}(${stringifyLogLevel(level)}): ${messages}`
    },
    cwd
  })
  const logger = { id: 'log' }
  f.error(logger, 'error')
  f.warn(logger, 'warn')
  f.info(logger, 'info')
  f.debug(logger, 'debug')

  const actual = fs.readFileSync(f.filepath, 'utf-8')
  expect(actual).toBe(`log(error): error
log(warn): warn
log(info): info
log(debug): debug
`)
})

test('log with custom level', () => {
  FileAppender.addCustomLevel('silly', 50)
  ensureNotExist('fixtures/format-fn/x.log')

  const cwd = resolvePath('fixtures/format-fn')
  const f = new FileAppender('x.log', { cwd })
  const logger = { id: 'log' };
  (f as any).silly(logger, 'silly')
  const actual = fs.readFileSync(f.filepath, 'utf-8')
  expect(actual).toBe(`log SILLY silly
`)
})
