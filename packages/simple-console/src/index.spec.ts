import { SimpleConsoleAppender } from '.';

describe('console appender', () => {
  let logger = { id: 'test logger' };

  test('can debug', () => {
    new SimpleConsoleAppender().debug(logger, 'test debug message');
  });

  test('can warn', () => {
    new SimpleConsoleAppender().warn(logger, 'test warn message');
  });

  test('can info', () => {
    new SimpleConsoleAppender().info(logger, 'test info message');
  });

  test('can error', () => {
    new SimpleConsoleAppender().error(logger, 'test error message');
  });
});
