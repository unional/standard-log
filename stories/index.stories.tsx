import { storiesOf } from '@storybook/react'
import { Console, Decode, Hook, Unhook } from 'console-feed'
import React from 'react'
import { config, createConsoleLogReporter, getLogger } from 'standard-log'

class ConsolePanel extends React.Component<{ console?: any }, { logs: any[] }> {
  state = {
    logs: []
  }
  hookedConsole
  componentDidMount() {
    this.hookedConsole = Hook(this.props.console || window.console, (log: any) => {
      this.setState(({ logs }) => ({ logs: [...logs, Decode(log)] }))
    })
  }
  componentWillUnmount() {
    return Unhook(this.hookedConsole)
  }
  render() {
    return (
      <div style={{ backgroundColor: '#242424' }}>
        <Console logs={this.state.logs} variant='dark' />
      </div>
    )
  }
}

storiesOf('Console', module)
  .add('hello world', () => {
    const reporter = createConsoleLogReporter()
    config({ mode: 'development', reporters: [reporter], logLevel: Infinity })
    const log = getLogger('testing')
    setImmediate(() => {
      log.debug('hello world')
      log.info('hello world')
      log.warn('hello world')
      log.error('hello world')
    })
    return <ConsolePanel console={reporter.console} />
  })
