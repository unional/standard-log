import { nodeTestPreset } from '@repobuddy/vitest/config/node'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [nodeTestPreset({ includeGeneralTests: true })],
	test: {
		globals: true,
		name: 'color',
		include: ['ts/**/*.spec.ts'],
		coverage: {
			include: ['ts/**/*.ts'],
			exclude: ['ts/**/*.spec.ts']
		}
	},
	resolve: {
		alias: {
			'^(\\.{1,2}/.*)\\.js$': '$1'
		}
	}
})
