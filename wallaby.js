module.exports = () => {
	return {
		files: [
			{ pattern: 'fixtures/**/*', instrument: false },
			{ pattern: 'scripts/*', instrument: false },
			{ pattern: 'package.json', instrument: false },
			{ pattern: 'tsconfig.*', instrument: false },
			{ pattern: 'vitest.config.*', instrument: false },
			'ts/**/*.ts',
			'!ts/**/*.spec.ts'
		],
		tests: ['ts/**/*.spec.ts'],
		env: { type: 'node' },
		testFramework: 'vitest',
		hints: {
			allowIgnoringCoverageInTests: true,
			ignoreCoverage: /istanbul ignore next/
		}
	}
}
