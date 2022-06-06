import watch from './config/jest.watch.mjs'

export default {
  collectCoverageFrom: [
    '<rootDir>/ts/**/*.[jt]s',
  ],
  projects: [
    'packages/*'
  ],
  ...watch
}
