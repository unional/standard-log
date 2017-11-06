'use strict';
'use strict';

const cp = require('child_process');
const browserSync = require('browser-sync')

let bs
cp.spawn('tsc', ['-w'], { shell: true })
  .stdout.on('data', (data) => {
    const text = data.toString()
    process.stdout.write(text)
    if (/.*Compilation complete/.test(text)) {
      const bundle = cp.spawn('npm', ['run', 'bundle'], {
        stdio: 'inherit',
        shell: true
      })
      bundle.on('close', code => {
        if (code === 0 && !bs) {
          bs = browserSync.create()
          bs.init({
            server: {
              baseDir: '.',
              index: 'demo.html'
            }
          })

          bs.reload('*.html')
        }
      })
    }
  })
