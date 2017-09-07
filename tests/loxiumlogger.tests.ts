import { expect } from 'chai';
import { ILogger } from '../src/ILogger'
import { LogBuilder } from "../src/LogBuilder";
import { LogLevel } from "../src/LogLevel";
import { ConsoleWriter } from "../src/ConsoleWriter";
import * as sinon from 'sinon'

describe('GivenLogger_WithConsoleWriter_WhenLoggingAtErrorLevel', () => {
    it('ThenLogsOutErrorToConsole', () => {
        let spy = sinon.spy(console, 'log');

        let logBuilder = new LogBuilder();

        let logger = logBuilder.setName('CustomLogger')
                               .writeTo(new ConsoleWriter())
                               .setMinimumLevel(LogLevel.debug)
                               .createLogger();

        logger.error((logBuilder) => {
            logBuilder.withMessage('Hello World');
        });

      const expected = '[error] Hello World';

      let actual:string = spy.getCall(0).args[0];

      expect(actual.indexOf(expected) !== -1).be.true;
    });
  });