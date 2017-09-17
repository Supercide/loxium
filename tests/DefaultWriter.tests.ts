import { expect } from 'chai'
import { LogBuilder } from '../src/LogBuilder';
import { LogLevel } from '../src/LogLevel';
import * as sinon from 'sinon';

let builder = new LogBuilder();

let logger = builder.setMinimumLevel(LogLevel.Debug)
                    .build();
var log:any;

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
        expect(log.calledOnce.getCall(0).args[0]).to.equal(true);
    });
});