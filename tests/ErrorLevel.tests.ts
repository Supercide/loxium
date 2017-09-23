import { expect } from 'chai';
import * as sinon from 'sinon';
import { LogBuilder } from '../src/LogBuilder';
import { LogLevel } from '../src/LogLevel';
import { TestEnricher } from './TestEnricher';
import { TestWriter } from './TestWriter';


const testWriter = new TestWriter();
const testEnricher = new TestEnricher();
const expected = new Date();
const builder = new LogBuilder();
const context = 'ErrorLevel.test.ts';
const logger = builder.setContext(context)
                    .writeTo(testWriter)
                    .enrichWith(testEnricher)
                    .setMinimumLevel(LogLevel.Error)
                    .build();
let clock;

beforeEach(() => {
  testWriter.logMessages = [];

  testEnricher.callCount = 0;
  clock = sinon.useFakeTimers(expected.getTime());
});

afterEach(() => {
    clock.restore();
});

describe('GivenLoggerSetToErrorLevel', () => {

  it('WhenLoggingAtErrorLevel_ThenLogsMessageAsError', () => {

    logger.error((logBuilder) => {
      logBuilder.withMessage('Hello World');
    }, 'someMethod');

    expect(LogLevel.Error).to.equal(testWriter.logMessages[0].level);
  });

  it('WhenLoggingAtErrorLevel_ThenLogsMessageWithTimestamp', () => {
    
      logger.error((logBuilder) => {
          logBuilder.withMessage('Hello World');
      }, 'someMethod');
      expect(`${expected}`).to.equal(`${testWriter.logMessages[0].timestamp}`);
  });

  it('WhenLogging_WithEnricher_ThenCallsEnrichers', () => {

    logger.error((logBuilder) => {
      logBuilder.withMessage('Hello World');
    }, 'someMethod');

    expect(1).to.equal(testEnricher.callCount);
  });

  it('WhenLoggingAtErrorLevel_ThenLogsMessage', () => {
    const expectedMessage = 'Hello World';

    logger.error((logBuilder) => {
      logBuilder.withMessage(expectedMessage);
    }, 'someMethod');

    expect(expectedMessage).to.equal(testWriter.logMessages[0].message);
  });

  it('WhenLoggingAtErrorLevel_ThenOnlyCallsWriterOnce', () => {
    let expectedMessage = 'Hello World';

    logger.error((logBuilder) => {
      logBuilder.withMessage(expectedMessage);
    }, 'someMethod');

    expect(1).to.equal(testWriter.logMessages.length);
  });

  it('WhenLoggingAtInformationLevel_ThenDoesNotLogMessage', () => {
    logger.information((logBuilder) => {
      logBuilder.withMessage('Hello World');
    }, 'someMethod');

    expect(0).to.equal(testWriter.logMessages.length);
  });

  it('WhenLoggingAtDebugLevel_ThenDoesNotLogMessage', () => {
    logger.debug((logBuilder) => {
      logBuilder.withMessage('Hello World');
    }, 'someMethod');

    expect(0).to.equal(testWriter.logMessages.length);
  });

  it('WhenLoggingAtTraceLevel_ThenDoesNotLogMessage', () => {
    logger.trace((logBuilder) => {
      logBuilder.withMessage('Hello World');
    }, 'someMethod');

    expect(0).to.equal(testWriter.logMessages.length);
  });

  it('WhenLoggingAtWarningLevel_ThenDoesNotLogMessage', () => {
    logger.warn((logBuilder) => {
      logBuilder.withMessage('Hello World');
    }, 'someMethod');

    expect(0).to.equal(testWriter.logMessages.length);
  });

  it('WhenLoggingAtErrorLevel_ThenLogsContext', () => {
    logger.error((logBuilder) => {
      logBuilder.withMessage('Hello World');
    }, 'someMethod');

    expect(context).to.equal(testWriter.logMessages[0].context);
  });

  it('WhenLoggingAtErrorLevel_WithMethod_ThenLogsMethod', () => {
    const expectedMethod = 'someMethod';

    logger.error((logBuilder) => {
      logBuilder.withMessage('Hello World');
    }, expectedMethod);

    expect(expectedMethod).to.equal(testWriter.logMessages[0].method);
  });

  it('WhenLoggingAtErrorLevel_WithProperties_ThenLogsProperties', () => {
    const expectedKey = 'customer_hash';
    const expectedValue = 'sdfsdfsd';

    logger.error((logBuilder) => {
      logBuilder.withMessage('Hello World')
                .withProperty(expectedKey, expectedValue);
    }, 'someMethod');

    expect(expectedValue).to.equal(testWriter.logMessages[0].properties[expectedKey]);
  });

  it('WhenLoggingAtErrorLevel_WithMultipleProperties_ThenLogsProperties', () => {
    const expectedKeyOne = 'customer_hash';
    const expectedKeyTwo = 'email_hash';
    const expectedValueOne = 'sdfsdfsd';
    const expectedValueTwo = 'wetyuty';

    logger.error((logBuilder) => {
      logBuilder.withMessage('Hello World')
                .withProperty(expectedKeyOne, expectedValueOne)
                .withProperty(expectedKeyTwo, expectedValueTwo);
    }, 'someMethod');

    expect(expectedValueOne).to.equal(testWriter.logMessages[0].properties[expectedKeyOne]);
    expect(expectedValueTwo).to.equal(testWriter.logMessages[0].properties[expectedKeyTwo]);
  });

  it('WhenLoggingAtErrorLevel_WithTags_ThenLogsTags', () => {
    const expectedTag = 'success';

    logger.error((logBuilder) => {
      logBuilder.withMessage('Hello World')
                .withTag(expectedTag);
    }, 'someMethod');

    expect(expectedTag).to.equal(testWriter.logMessages[0].tags[0]);
  });

  it('WhenLoggingAtErrorLevel_WithMultipleTags_ThenLogsTags', () => {
    const expectedTagOne = 'success';
    const expectedTagTwo = 'failure';

    logger.error((logBuilder) => {
      logBuilder.withMessage('Hello World')
                .withTag(expectedTagOne)
                .withTag(expectedTagTwo);
    }, 'someMethod');

    expect(testWriter.logMessages[0].tags.indexOf(expectedTagOne) > -1).to.equal(true);
    expect(testWriter.logMessages[0].tags.indexOf(expectedTagTwo) > -1).to.equal(true);
  });

  it('WhenLogging_WithEnricher_ThenEnrichesLogMessage', () => {
    
    logger.error((logBuilder) => {
      logBuilder.withMessage('Hello World');
    }, 'someMethod');

    expect(true).to.equal(testWriter.logMessages[0].properties['enriched']);
  });
  it('WhenLoggingWithPropertyUsingSamePropertyInEnricher_ThenWithPropertyOverridesEnricher', () => {
    
    logger.error((logBuilder) => {
      logBuilder.withMessage('Hello World')
                .withProperty('enriched', false);
    }, 'someMethod');

    expect(false).to.equal(testWriter.logMessages[0].properties['enriched']);
  });

  it('WhenLoggingWithEnricher_ThenLogContainsEnrichersTags ', () => {
    
    logger.error((logBuilder) => {
      logBuilder.withMessage('Hello World');
    }, 'someMethod');

    expect(testWriter.logMessages[0].tags.indexOf('EnrichedTag') > -1).to.equal(true);
  });

  it('WhenLoggingWithDuplicateTagsFromEnricherAndExplicitlySetTags_ThenRemovesDuplicateTags ', () => {
    
    logger.error((logBuilder) => {
      logBuilder.withMessage('Hello World')
                .withProperty('enriched', false)
                .withTag('EnrichedTag');
    }, 'someMethod');

    expect(testWriter.logMessages[0].tags.length).to.equal(1);
    expect(testWriter.logMessages[0].tags[0]).to.equal('EnrichedTag');
  });
});
