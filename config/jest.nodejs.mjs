import ts from './jest.ts.mjs'

export default {
  ...ts,
  testEnvironment: 'node',
  testMatch: ['**/?*.(spec|test|integrate|accept|system|unit).[jt]s?(x)'],
}
