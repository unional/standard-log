import { nodeTestPreset } from '@repobuddy/vitest/config/node'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [nodeTestPreset({ includeGeneralTests: true })],
	test: {
		globals: true,
		name: 'log',
		include: ['ts/**/*.spec.ts'],
		coverage: {
			include: ['ts/**/*.ts'],
			exclude: ['ts/**/*.spec.ts', 'ts/**/test_utils*.ts', 'ts/testing/**']
		}
	},
	resolve: {
		alias: {
			'^(\\.{1,2}/.*)\\.js$': '$1'
		}
	}
})
