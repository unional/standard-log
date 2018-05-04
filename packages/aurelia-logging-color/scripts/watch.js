'use strict';

const cp = require('child_process');

let runner;
cp.spawn('tsc', ['-w'], { shell: true })
  .stdout.on('data', (data) => {
    const text = data.toString()
    process.stdout.write(text)
    if (/.*Compilation complete/.test(text)) {
      if (!runner) {
        runner = cp.spawn('ava', ['-w'], {
          stdio: 'inherit',
          shell: true
        })
      }
      cp.spawnSync('npm', ['run', 'lint'], {
        stdio: 'inherit',
        shell: true
      })
      cp.spawnSync('npm', ['run', 'bundle'], {
        stdio: 'inherit',
        shell: true
      })
    }
  })
