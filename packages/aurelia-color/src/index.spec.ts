import { addAppender, setLevel, getLogger, logLevel } from 'aurelia-logging'

import { ColorAppender } from '.'

test('demo', () => {

  addAppender(new ColorAppender())

  // turn on logging (this example do it globally)
  setLevel(logLevel.info)

  const loggerA = getLogger('Logger A')

  loggerA.warn('Pretty Color')

  const loggerB = getLogger('Logger B')

  loggerB.info('Nother pretty color!')
})
