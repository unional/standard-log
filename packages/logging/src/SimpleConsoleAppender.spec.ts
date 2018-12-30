import { SimpleConsoleAppender } from '.';

describe('simple console appender', () => {
  let logger = { id: 'test logger' };

  it('can debug', () => {
    new SimpleConsoleAppender().debug(logger, 'test debug message');
  });

  it('can warn', () => {
    new SimpleConsoleAppender().warn(logger, 'test warn message');
  });

  it('can info', () => {
    new SimpleConsoleAppender().info(logger, 'test info message');
  });

  it('can error', () => {
    new SimpleConsoleAppender().error(logger, 'test error message');
  });
});
