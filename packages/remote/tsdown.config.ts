import { writeFileSync } from 'node:fs'
import { defineConfig } from 'tsdown'

const shared = {
	// Every non-spec source is an entry, so the emitted tree mirrors `ts/` exactly the way
	// the `tsc` passes this replaces did. Deep imports of published paths keep resolving.
	entry: ['ts/**/*.ts', '!ts/**/*.spec.ts'],
	// Keeps the per-module shape `tsc` used to emit, so every published path stays put.
	unbundle: true,
	// Declaration maps keep "go to definition" landing in `ts/`, which ships in the tarball.
	dts: { sourcemap: true },
	sourcemap: true,
	outExtensions: () => ({ js: '.js', dts: '.d.ts' })
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
	}
])
