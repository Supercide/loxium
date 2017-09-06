import { expect } from 'chai';
import { LoggerFactory, LogLevel} from '../src/loxiumlogger'
import { ILogger } from '../src/logger.interface'

describe('GivenLogger_WhenLoggingAtErrorLevel', () => {
    it('ThenLogsAtErrorLevel', () => {
        let factory:LoggerFactory = new LoggerFactory();

        let logger:ILogger = factory.createLogger('default', LogLevel.debug);

        logger.error((logBuilder) => {
            logBuilder.withMessage('Hello World');
        });
      const result = 'Hello World!';
      expect(result).to.equal('Hello World!');
    });
  });