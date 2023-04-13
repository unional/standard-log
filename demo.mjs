import { createStandardLog, logLevels } from 'standard-log'
import { createColorLogReporter } from 'standard-log-color'
const standardLog = createStandardLog({
	logLevel: logLevels.debug,
	reporters: [createColorLogReporter()]
})

const logger = standardLog.getLogger(['standard-log'])
logger.error('error message')
logger.warn('warn message')
logger.info('info message')
logger.debug('debug message')
