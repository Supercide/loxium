import { expect } from 'chai';
import * as sinon from 'sinon';
import { LogBuilder } from '../src/LogBuilder';
import { LogLevel } from '../src/LogLevel';

const builder = new LogBuilder();

const logger = builder.setMinimumLevel(LogLevel.Debug)
                    .build();
let log: any;

beforeEach(() => {
    log = sinon.spy(console, 'log');
});

afterEach(() => {
    log.restore();
});

describe('GivenLogger_WithNoWriterSet', () => {

    it('WhenLoggingAtDebugLevel_ThenLogsMessageToConsole', () => {

        logger.debug((logBuilder) => {
            logBuilder.withMessage('Hello World');
        });

        expect(log.calledOnce).to.equal(true);
    });
});