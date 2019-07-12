import { storiesOf } from '@storybook/react';
import { Console, Decode, Hook, Unhook } from 'console-feed';
import React from 'react';
import { getLogger } from 'standard-log';

storiesOf('Console', module)
  .add('test', () => {
    setImmediate(() => {
      const logger = getLogger('testing')
      console.log(logger, getLogger)
      console.log('test 1')
    })
    return <ConsolePanel />
  })
  .add('tes23', () => {
    setImmediate(() => {
      console.log('te3333st 1')
    })
    return <ConsolePanel />
  })

class ConsolePanel extends React.Component<{}, { logs: any[]}> {
  state = {
    logs: []
  }
  hookedConsole
  componentDidMount() {
    this.hookedConsole = Hook(window.console, (log: any) => {
      this.setState(({ logs }) => ({ logs: [...logs, Decode(log)] }))
    })
  }
  componentWillUnmount() {
    Unhook(this.hookedConsole)
  }
  render() {
    return (
      <div style={{ backgroundColor: '#242424' }}>
        <Console logs={this.state.logs} variant='dark' />
      </div>
    )
  }
}
