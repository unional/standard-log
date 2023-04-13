import watch from './config/jest.watch.cjs'

export default {
	collectCoverageFrom: ['<rootDir>/ts/**/*.[jt]s'],
	projects: ['packages/*'],
	...watch
}
