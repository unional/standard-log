import ts from './jest.ts.cjs'

export default {
  ...ts,
  testEnvironment: 'node',
  testMatch: ['**/?*.(spec|test|integrate|accept|system|unit).[jt]s?(x)'],
}
