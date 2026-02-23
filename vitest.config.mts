import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		projects: [
			'./packages/log/vitest.config.ts',
			'./packages/color/vitest.config.ts',
			'./packages/syslog/vitest.config.ts',
			'./packages/remote/vitest.config.ts'
		]
	}
})
