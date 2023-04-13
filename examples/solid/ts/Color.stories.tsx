import { createStandardLog } from 'standard-log'
import { createColorLogReporter } from 'standard-log-color'

export default {
	title: 'color'
}

export const Color = () => {
	const sl = createStandardLog({ reporters: [createColorLogReporter()] })
	const log = sl.getLogger('test')
	log.info('hello world')
	return <div>open dev tool to see the result</div>
}
