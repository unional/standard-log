'use strict';

const cp = require('child_process');

const isWindows = /^win/.test(process.platform);

cp.exec(`${isWindows? 'start': 'open'} demo.html`)
