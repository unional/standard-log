'use strict';

const cp = require('child_process');

cp.spawn('tsc', ['-w'], { shell: true })
  .stdout.on('data', (data) => {
    const text = data.toString()
    process.stdout.write(text)

    let runner;
    if (/.*Compilation complete/.test(text)) {
      if (!runner) {
        runner = cp.spawn('ava', ['-w', '--verbose'], {
          stdio: 'inherit',
          shell: true
        })
      }
      cp.spawnSync('npm', ['run', 'lint'], {
        stdio: 'inherit',
        shell: true
      })
    }
  })
