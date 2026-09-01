import { writeFileSync } from 'node:fs'
import { defineConfig } from 'tsdown'

const shared = {
	// Every non-spec source is an entry, so the emitted tree mirrors `ts/` exactly the way
	// the `tsc` passes this replaces did. Deep imports of published paths — including the
	// `browser` field's `*.browser.js` targets — keep resolving.
	entry: ['ts/**/*.ts', '!ts/**/*.spec.ts'],
	unbundle: true,
	// Declaration maps keep "go to definition" landing in `ts/`, which ships in the tarball.
	dts: { sourcemap: true },
	sourcemap: true,
	outExtensions: () => ({ js: '.js', dts: '.d.ts' })
} as const

const bundle = {
	entry: { 'standard-log-color': 'ts/index.ts' },
	outDir: 'dist',
	// These are the browser-facing bundles; node builtins reached from them stay external.
	platform: 'browser' as const,
	sourcemap: true,
	dts: false,
	// A browser bundle with externals is not a browser bundle. webpack inlined runtime
	// dependencies here, and the published `dist/` files are only useful if it stays that way.
	noExternal: [/.*/]
} as const

export default defineConfig([
	{ ...shared, format: 'esm', outDir: 'esm' },
	{
		...shared,
		format: 'cjs',
		outDir: 'cjs',
		hooks: {
			// `copy`'s `to` is treated as a directory, so the CJS type marker is written here.
			// Without it Node parses cjs/*.js as ESM, because the package is "type": "module".
			'build:done': () => writeFileSync('cjs/package.json', '{ "type": "commonjs" }\n')
		}
	},
	{
		...bundle,
		format: 'iife',
		globalName: 'StandardLogColor',
		outputOptions: { entryFileNames: '[name].iife.js' }
	},
	{ ...bundle, format: 'esm', outputOptions: { entryFileNames: '[name].esm.js' } }
])
