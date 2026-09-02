import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * This package ships a `cjs/` build and declares no `engines.node` floor, so every runtime
 * dependency has to stay loadable from CommonJS.
 *
 * `supports-color` broke this twice: 12.1.2 shipped "Downgrade supports-color for cjs support",
 * and 13.0.1 regressed it again by moving to `supports-color@11`, which is `"type": "module"`.
 * A bare `require()` on a modern Node hides the break, because Node's `require(ESM)` support
 * loads it anyway. Downstream CommonJS module registries — jest, Electron, jsdom, webpack —
 * do not, so they fail with `SyntaxError: Unexpected token 'export'`.
 *
 * These tests therefore look at the dependency the way a CommonJS registry does, and do not
 * rely on the running Node version's `require(ESM)` behaviour.
 */
const packageDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const packageJson = JSON.parse(readFileSync(join(packageDir, 'package.json'), 'utf8')) as {
	dependencies?: Record<string, string>
}
const dependencies = Object.keys(packageJson.dependencies ?? {})
const requireFromPackage = createRequire(join(packageDir, 'noop.cjs'))

/**
 * Resolve a dependency under the `require` condition and report whether the file Node lands on
 * is actually CommonJS, mirroring how a CommonJS loader picks the entry.
 */
function resolveRequireEntry(dependency: string) {
	const entry = requireFromPackage.resolve(dependency)
	if (entry.endsWith('.cjs')) return { entry, isCommonJS: true }
	if (entry.endsWith('.mjs')) return { entry, isCommonJS: false }

	let dir = dirname(entry)
	while (true) {
		const manifest = join(dir, 'package.json')
		if (existsSync(manifest)) {
			const type = (JSON.parse(readFileSync(manifest, 'utf8')) as { type?: string }).type
			return { entry, isCommonJS: type !== 'module' }
		}
		const parent = dirname(dir)
		if (parent === dir) return { entry, isCommonJS: true }
		dir = parent
	}
}

it('has at least one runtime dependency to check', () => {
	expect(dependencies.length).toBeGreaterThan(0)
})

it.each(
	dependencies
)('runtime dependency `%s` resolves to CommonJS under the require condition', dependency => {
	const { entry, isCommonJS } = resolveRequireEntry(dependency)
	expect(
		isCommonJS,
		`\`${dependency}\` resolves to the ES module ${entry} under the \`require\` condition. ` +
			'This package ships a cjs/ build, so a CommonJS consumer cannot load it. ' +
			'Pick a version line that still publishes CommonJS.'
	).toBe(true)
})

/**
 * `--no-experimental-require-module` turns off Node's `require(ESM)` support, which is what
 * masked this regression. What is left is how jest, Electron and webpack load a package.
 * The static check above is the guard that always runs; this one adds a real `require()` on
 * the Node versions that still accept the flag.
 */
const canDisableRequireEsm = (() => {
	try {
		execFileSync(process.execPath, ['--no-experimental-require-module', '-e', ''], { stdio: 'pipe' })
		return true
	} catch {
		return false
	}
})()

it.skipIf(!canDisableRequireEsm).each(dependencies)(
	'runtime dependency `%s` loads in a CommonJS context',
	dependency => {
		expect(() =>
			execFileSync(
				process.execPath,
				['--no-experimental-require-module', '-e', `require(${JSON.stringify(dependency)})`],
				{
					cwd: packageDir,
					stdio: 'pipe'
				}
			)
		).not.toThrow()
	}
)
