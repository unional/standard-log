const StandardLog = require('standard-log')

StandardLog.config({ logLevel: StandardLog.logLevels.debug })
const log = StandardLog.getLogger('my-app')

log.debug('debug')
log.info('info')
log.warn('warn')
log.error('error')
