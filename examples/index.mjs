import { config, getLogger, logLevels } from 'standard-log'

config({ logLevel: logLevels.debug })
const log = getLogger('my-app')

log.debug('debug')
log.info('info')
log.warn('warn')
log.error('error')
