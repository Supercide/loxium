import { expect } from 'chai';
import * as sinon from 'sinon';
import { LogBuilder } from '../src/LogBuilder';
import { LogLevel } from '../src/LogLevel';
import { TestEnricher } from './TestEnricher';
import { TestWriter } from './TestWriter';

const testWriter = new TestWriter();
const testEnricher = new TestEnricher();

const builder = new LogBuilder();
const context = 'DebugLevel.test.ts';
const logger = builder.setContext(context)
    .writeTo(testWriter)
    .enrichWith(testEnricher)
    .setMinimumLevel(LogLevel.Debug)
    .build();

const now = new Date();
let clock;

beforeEach(() => {
    testWriter.logMessages = [];
    testEnricher.callCount = 0;
    clock = sinon.useFakeTimers(now.getTime());
});

afterEach(() => {
    clock.restore();
});
    
describe('GivenLoggerSetToDebugLevel', () => {

    it('WhenLoggingAtDebugLevel_ThenLogsMessageAsDebug', () => {

        logger.debug((logBuilder) => {
            logBuilder.withMessage('Hello World');
        }, 'someMethod');

        expect(LogLevel.Debug).to.equal(testWriter.logMessages[0].level);
    });

    it('WhenLoggingAtDebugLevel_ThenLogsMessageWithTimestamp', () => {

        logger.debug((logBuilder) => {
            logBuilder.withMessage('Hello World');
        }, 'someMethod');

        expect(`${now}`).to.equal(`${testWriter.logMessages[0].timestamp}`);
    });

    it('WhenLogging_WithEnricher_ThenCallsEnrichers', () => {

        logger.debug((logBuilder) => {
            logBuilder.withMessage('Hello World');
        }, 'someMethod');

        expect(1).to.equal(testEnricher.callCount);
    });

    it('WhenLogging_WithEnricher_ThenEnrichesLogMessage', () => {

        logger.debug((logBuilder) => {
            logBuilder.withMessage('Hello World');
        }, 'someMethod');

        expect(true).to.equal(testWriter.logMessages[0].properties['enriched']);
    });

    it('WhenLoggingAtDebugLevel_ThenLogsMessage', () => {
        const expectedMessage = 'Hello World';

        logger.debug((logBuilder) => {
            logBuilder.withMessage(expectedMessage);
        }, 'someMethod');

        expect(expectedMessage).to.equal(testWriter.logMessages[0].message);
    });

    it('WhenLoggingAtDebugLevel_ThenOnlyCallsWriterOnce', () => {
        const expectedMessage = 'Hello World';

        logger.debug((logBuilder) => {
            logBuilder.withMessage(expectedMessage);
        }, 'someMethod');

        expect(1).to.equal(testWriter.logMessages.length);
    });

    it('WhenLoggingAtInformationLevel_ThenLogsMessage', () => {
        logger.information((logBuilder) => {
            logBuilder.withMessage('Hello World');
        }, 'someMethod');

        expect(1).to.equal(testWriter.logMessages.length);
    });

    it('WhenLoggingAtTraceLevel_ThenDoesNotLogMessage', () => {
        logger.trace((logBuilder) => {
            logBuilder.withMessage('Hello World');
        }, 'someMethod');

        expect(0).to.equal(testWriter.logMessages.length);
    });

    it('WhenLoggingAtWarningLevel_ThenLogsMessage', () => {
        logger.warn((logBuilder) => {
            logBuilder.withMessage('Hello World');
        }, 'someMethod');

        expect(1).to.equal(testWriter.logMessages.length);
    });

    it('WhenLoggingAtErrorLevel_ThenLogsMessage', () => {
        logger.error((logBuilder) => {
            logBuilder.withMessage('Hello World');
        }, 'someMethod');

        expect(1).to.equal(testWriter.logMessages.length);
    });

    it('WhenLoggingAtDebugLevel_ThenLogsContext', () => {
        logger.debug((logBuilder) => {
            logBuilder.withMessage('Hello World');
        }, 'someMethod');

        expect(context).to.equal(testWriter.logMessages[0].context);
    });

    it('WhenLoggingAtDebugLevel_WithMethod_ThenLogsMethod', () => {
        const expectedMethod = 'someMethod';

        logger.debug((logBuilder) => {
            logBuilder.withMessage('Hello World');
        }, expectedMethod);

        expect(expectedMethod).to.equal(testWriter.logMessages[0].method);
    });

    it('WhenLoggingAtDebugLevel_WithProperties_ThenLogsProperties', () => {
        const expectedKey = 'customer_hash';
        const expectedValue = 'sdfsdfsd';

        logger.debug((logBuilder) => {
            logBuilder.withMessage('Hello World')
                .withProperty(expectedKey, expectedValue);
        }, 'someMethod');

        expect(expectedValue).to.equal(testWriter.logMessages[0].properties[expectedKey]);
    });

    it('WhenLoggingAtDebugLevel_WithMultipleProperties_ThenLogsProperties', () => {
        const expectedKeyOne = 'customer_hash';
        const expectedKeyTwo = 'email_hash';
        const expectedValueOne = 'sdfsdfsd';
        const expectedValueTwo = 'wetyuty';

        logger.debug((logBuilder) => {
            logBuilder.withMessage('Hello World')
                .withProperty(expectedKeyOne, expectedValueOne)
                .withProperty(expectedKeyTwo, expectedValueTwo);
        }, 'someMethod');

        expect(expectedValueOne).to.equal(testWriter.logMessages[0].properties[expectedKeyOne]);
        expect(expectedValueTwo).to.equal(testWriter.logMessages[0].properties[expectedKeyTwo]);
    });

    it('WhenLoggingAtDebugLevel_WithTags_ThenLogsTags', () => {
        const expectedTag = 'success';

        logger.debug((logBuilder) => {
            logBuilder.withMessage('Hello World')
                .withTag(expectedTag);
        }, 'someMethod');

        expect(testWriter.logMessages[0].tags.indexOf(expectedTag) > -1).to.equal(true);
    });

    it('WhenLoggingAtDebugLevel_WithMultipleTags_ThenLogsTags', () => {
        const expectedTagOne = 'success';
        const expectedTagTwo = 'failure';

        logger.debug((logBuilder) => {
            logBuilder.withMessage('Hello World')
                .withTag(expectedTagOne)
                .withTag(expectedTagTwo);
        }, 'someMethod');

        expect(testWriter.logMessages[0].tags.indexOf(expectedTagOne) > -1).to.equal(true);
        expect(testWriter.logMessages[0].tags.indexOf(expectedTagTwo) > -1).to.equal(true);
    });

    it('WhenLoggingWithPropertyUsingSamePropertyInEnricher_ThenWithPropertyOverridesEnricher', () => {

        logger.debug((logBuilder) => {
            logBuilder.withMessage('Hello World')
                .withProperty('enriched', false);
        }, 'someMethod');

        expect(false).to.equal(testWriter.logMessages[0].properties['enriched']);
    });

    it('WhenLoggingWithEnricher_ThenLogContainsEnrichersTags ', () => {

        logger.debug((logBuilder) => {
            logBuilder.withMessage('Hello World');
        }, 'someMethod');

        expect(testWriter.logMessages[0].tags.indexOf('EnrichedTag') > -1).to.equal(true);
    });

    it('WhenLoggingWithDuplicateTagsFromEnricherAndExplicitlySetTags_ThenRemovesDuplicateTags ', () => {

        logger.debug((logBuilder) => {
            logBuilder.withMessage('Hello World')
                .withProperty('enriched', false)
                .withTag('EnrichedTag');
        }, 'someMethod');

        expect(testWriter.logMessages[0].tags.length).to.equal(1);
        expect(testWriter.logMessages[0].tags[0]).to.equal('EnrichedTag');
    });
});
