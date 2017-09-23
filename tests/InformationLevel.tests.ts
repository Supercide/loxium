import { expect } from 'chai';
import * as sinon from 'sinon';
import { LogBuilder } from '../src/LogBuilder';
import { LogLevel } from '../src/LogLevel';
import { TestEnricher } from './TestEnricher';
import { TestWriter } from './TestWriter';

const testWriter = new TestWriter();
const testEnricher = new TestEnricher();
const builder = new LogBuilder();
const context = 'InformationLevel.test.ts';
const logger = builder.setContext(context)
                    .writeTo(testWriter)
                    .enrichWith(testEnricher)
                    .setMinimumLevel(LogLevel.Info)
                    .build();

const expected = new Date();
let clock;
                    
beforeEach(() => {
  testWriter.logMessages = [];

  testEnricher.callCount = 0;
  clock = sinon.useFakeTimers(expected.getTime());
});

afterEach(() => {
    clock.restore();
});

describe('GivenLoggerSetToInformationLevel', () => {

  it('WhenLoggingAtInformationLevel_ThenLogsMessageAsInformation', () => {

    logger.information((logBuilder) => {
      logBuilder.withMessage('Hello World');
    }, 'someMethod');

    expect(LogLevel.Info).to.equal(testWriter.logMessages[0].level);
  });

  it('WhenLoggingAtInformationLevel_ThenLogsMessageWithTimestamp', () => {
    
      logger.information((logBuilder) => {
          logBuilder.withMessage('Hello World');
      }, 'someMethod');
      expect(`${expected}`).to.equal(`${testWriter.logMessages[0].timestamp}`);
  });

  it('WhenLogging_WithEnricher_ThenCallsEnrichers', () => {

    logger.information((logBuilder) => {
      logBuilder.withMessage('Hello World');
    }, 'someMethod');

    expect(1).to.equal(testEnricher.callCount);
  });

  it('WhenLoggingAtInformationLevel_ThenLogsMessage', () => {
    const expectedMessage = 'Hello World';

    logger.information((logBuilder) => {
      logBuilder.withMessage(expectedMessage);
    }, 'someMethod');

    expect(expectedMessage).to.equal(testWriter.logMessages[0].message);
  });

  it('WhenLoggingAtInformationLevel_ThenOnlyCallsWriterOnce', () => {
    const expectedMessage = 'Hello World';

    logger.information((logBuilder) => {
      logBuilder.withMessage(expectedMessage);
    }, 'someMethod');

    expect(1).to.equal(testWriter.logMessages.length);
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

  it('WhenLoggingAtInformationLevel_ThenLogsContext', () => {
    logger.information((logBuilder) => {
      logBuilder.withMessage('Hello World');
    }, 'someMethod');

    expect(context).to.equal(testWriter.logMessages[0].context);
  });

  it('WhenLoggingAtInformationLevel_WithMethod_ThenLogsMethod', () => {
    const expectedMethod = 'someMethod';

    logger.information((logBuilder) => {
      logBuilder.withMessage('Hello World');
    }, expectedMethod);

    expect(expectedMethod).to.equal(testWriter.logMessages[0].method);
  });

  it('WhenLoggingAtInformationLevel_WithProperties_ThenLogsProperties', () => {
    const expectedKey = 'customer_hash';
    const expectedValue = 'sdfsdfsd';

    logger.information((logBuilder) => {
      logBuilder.withMessage('Hello World')
        .withProperty(expectedKey, expectedValue);
    }, 'someMethod');

    expect(expectedValue).to.equal(testWriter.logMessages[0].properties[expectedKey]);
  });

  it('WhenLoggingAtInformationLevel_WithMultipleProperties_ThenLogsProperties', () => {
    const expectedKeyOne = 'customer_hash';
    const expectedKeyTwo = 'email_hash';
    const expectedValueOne = 'sdfsdfsd';
    const expectedValueTwo = 'wetyuty';

    logger.information((logBuilder) => {
      logBuilder.withMessage('Hello World')
                .withProperty(expectedKeyOne, expectedValueOne)
                .withProperty(expectedKeyTwo, expectedValueTwo);
    }, 'someMethod');

    expect(expectedValueOne).to.equal(testWriter.logMessages[0].properties[expectedKeyOne]);
    expect(expectedValueTwo).to.equal(testWriter.logMessages[0].properties[expectedKeyTwo]);
  });

  it('WhenLoggingAtInformationLevel_WithTags_ThenLogsTags', () => {
    const expectedTag = 'success';

    logger.information((logBuilder) => {
      logBuilder.withMessage('Hello World')
                .withTag(expectedTag);
    }, 'someMethod');

    expect(expectedTag).to.equal(testWriter.logMessages[0].tags[0]);
  });

  it('WhenLoggingAtInformationLevel_WithMultipleTags_ThenLogsTags', () => {
    const expectedTagOne = 'success';
    const expectedTagTwo = 'failure';

    logger.information((logBuilder) => {
      logBuilder.withMessage('Hello World')
                .withTag(expectedTagOne)
                .withTag(expectedTagTwo);
    }, 'someMethod');

    expect(testWriter.logMessages[0].tags.indexOf(expectedTagOne) > -1).to.equal(true);
    expect(testWriter.logMessages[0].tags.indexOf(expectedTagTwo) > -1).to.equal(true);
  });
  
  it('WhenLogging_WithEnricher_ThenEnrichesLogMessage', () => {
    
    logger.information((logBuilder) => {
      logBuilder.withMessage('Hello World');
    }, 'someMethod');

    expect(true).to.equal(testWriter.logMessages[0].properties['enriched']);
  });

  it('WhenLoggingWithPropertyUsingSamePropertyInEnricher_ThenWithPropertyOverridesEnricher', () => {
    
    logger.information((logBuilder) => {
      logBuilder.withMessage('Hello World')
                .withProperty('enriched', false);
    }, 'someMethod');

    expect(false).to.equal(testWriter.logMessages[0].properties['enriched']);
  });
  it('WhenLoggingWithEnricher_ThenLogContainsEnrichersTags ', () => {
    
    logger.information((logBuilder) => {
      logBuilder.withMessage('Hello World');
    }, 'someMethod');

    expect(testWriter.logMessages[0].tags.indexOf('EnrichedTag') > -1).to.equal(true);
  });

  it('WhenLoggingWithDuplicateTagsFromEnricherAndExplicitlySetTags_ThenRemovesDuplicateTags ', () => {
    
    logger.information((logBuilder) => {
      logBuilder.withMessage('Hello World')
                .withProperty('enriched', false)
                .withTag('EnrichedTag');
    }, 'someMethod');

    expect(testWriter.logMessages[0].tags.length).to.equal(1);
    expect(testWriter.logMessages[0].tags[0]).to.equal('EnrichedTag');
  });
});
