import { a, AssertOrder } from 'assertron'
import { createStandardLog, LogEntry, logLevels } from 'standard-log'
import { createRemoteLogReporter } from './createRemoteLogReporter.js'
import { ctx } from './crreateRemoteLogReporter.ctx.js'

it('send log entry to the server', () => {
	const reporter = createRemoteLogReporter({
		url: 'http://echo.com'
	})

	const sl = createStandardLog({ reporters: [reporter] })
	const log = sl.getLogger('log id')

	const o = new AssertOrder(1)
	mockFetch((url, init) => {
		o.once(1)
		expect(url).toEqual('http://echo.com')
		a.satisfies(JSON.parse(init.body as any), {
			id: 'log id',
			level: logLevels.info,
			args: ['hello']
		})
	})

	log.info('hello')
	o.end()
})

it('supports custom filter', () => {
	const filter = (e: LogEntry) => e.id !== 'secret'
	const reporter = createRemoteLogReporter({
		url: 'http://echo.com',
		filter
	})

	expect(reporter.filter).toEqual(filter)

	const sl = createStandardLog({ reporters: [reporter] })
	const log = sl.getLogger('log id')

	const o = new AssertOrder(1)
	mockFetch((_, init) => {
		o.once(1)
		a.satisfies(JSON.parse(init.body as any), {
			id: 'log id',
			level: logLevels.info,
			args: ['hello']
		})
	})

	sl.getLogger('secret').info('key')
	log.info('hello')
	o.end()
})

it('supports custom formatter', () => {
	const formatter = (e: LogEntry) => JSON.stringify({ ...e, id: 'another' })
	const reporter = createRemoteLogReporter({
		url: 'http://echo.com',
		formatter
	})

	expect(reporter.formatter).toEqual(formatter)

	const sl = createStandardLog({ reporters: [reporter] })
	const log = sl.getLogger('log id')

	const o = new AssertOrder(1)
	mockFetch((url, init) => {
		o.once(1)
		expect(url).toEqual('http://echo.com')
		a.satisfies(JSON.parse(init.body as any), {
			id: 'another',
			level: logLevels.info,
			args: ['hello']
		})
	})

	log.info('hello')
	o.end()
})

it('ignores service failure', () => {
	const reporter = createRemoteLogReporter({
		url: 'http://echo.com'
	})

	const sl = createStandardLog({ reporters: [reporter] })
	const log = sl.getLogger('log id')

	mockFetch(() => {
		throw new Error('unable to send')
	})

	log.info('hello')
})

function mockFetch(handler?: (url: string, init: Request) => void) {
	ctx.fetch = (async (url: any, init: any) => (handler ? handler(url, init) : () => Promise.resolve())) as any
}
