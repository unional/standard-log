import { configGlobal, getLogger, logLevels } from 'standard-log'
import { createColorLogReporter } from '../esm/index.js'

configGlobal({ logLevel: logLevels.debug, reporters: [createColorLogReporter()] })
const log = getLogger('my-awesome-app')

log.debug('debug')
log.info('info')
log.warn('warn')
log.error('error')
