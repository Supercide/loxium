import { expect } from 'chai'
import { LogBuilder } from '../src/LogBuilder';
import { LogLevel } from '../src/LogLevel';
import { TestWriter } from './TestWriter';
import { TestEnricher } from './TestEnricher';

let testWriter = new TestWriter();
let testEnricher = new TestEnricher();

let builder = new LogBuilder();
let context = 'WarningLevel.test.ts';
let logger = builder.setContext(context)
                       .writeTo(testWriter)
                       .enrichWith(testEnricher)
                       .setMinimumLevel(LogLevel.Warn)
                       .createLogger();

beforeEach(() => {
  testWriter.logMessages = [];
  testEnricher.messageLogs = [];  
});

describe('GivenLoggerSetToWarningLevel', () => {
 
    it('WhenLoggingAtWarningLevel_ThenLogsMessageAsWarning', () => {    

        logger.Warn((logBuilder) => {
            logBuilder.withMessage('Hello World');
        });

      expect(LogLevel.Warn).to.equal(testWriter.logMessages[0].level);
    });

    it('WhenLogging_WithEnricher_ThenCallsEnrichers', () => {    
      
        logger.Warn((logBuilder) => {
            logBuilder.withMessage('Hello World');
        });

      expect(1).to.equal(testEnricher.messageLogs.length);
    });
  
    it('WhenLoggingAtWarningLevel_ThenLogsMessage', () => {
        let expectedMessage = 'Hello World';

        logger.Warn((logBuilder) => {
            logBuilder.withMessage(expectedMessage);
        });

      expect(expectedMessage).to.equal(testWriter.logMessages[0].message);
    });

    it('WhenLoggingAtWarningLevel_ThenOnlyCallsWriterOnce', () => {
        let expectedMessage = 'Hello World';

        logger.Warn((logBuilder) => {
            logBuilder.withMessage(expectedMessage);
        });

      expect(1).to.equal(testWriter.logMessages.length);
    });

    it('WhenLoggingAtInformationLevel_ThenDoesNotLogMessage', () => {
      logger.Information((logBuilder) => {
          logBuilder.withMessage('Hello World');
      });

    expect(0).to.equal(testWriter.logMessages.length);
  });

  it('WhenLoggingAtDebugLevel_ThenDoesNotLogMessage', () => {
    logger.Debug((logBuilder) => {
        logBuilder.withMessage('Hello World');
    });

  expect(0).to.equal(testWriter.logMessages.length);
});

it('WhenLoggingAtTraceLevel_ThenDoesNotLogMessage', () => {
  logger.Trace((logBuilder) => {
      logBuilder.withMessage('Hello World');
  });

expect(0).to.equal(testWriter.logMessages.length);
});

it('WhenLoggingAtErrorLevel_ThenLogsMessage', () => {
  logger.Error((logBuilder) => {
      logBuilder.withMessage('Hello World');
  });

expect(1).to.equal(testWriter.logMessages.length);
});

    it('WhenLoggingAtWarningLevel_ThenLogsContext', () => {
      logger.Warn((logBuilder) => {
          logBuilder.withMessage('Hello World');
      });

    expect(context).to.equal(testWriter.logMessages[0].context);
  });

  it('WhenLoggingAtWarningLevel_WithMethod_ThenLogsMethod', () => {
    let expectedMethod = 'someMethod';

    logger.Warn((logBuilder) => {
        logBuilder.withMessage('Hello World');
    }, expectedMethod);

    expect(expectedMethod).to.equal(testWriter.logMessages[0].method);
  });

  it('WhenLoggingAtWarningLevel_WithProperties_ThenLogsProperties', () => {
    let expectedKey = 'customer_hash';
    let expectedValue = 'sdfsdfsd';

    logger.Warn((logBuilder) => {
        logBuilder.withMessage('Hello World')
                  .withProperty(expectedKey, expectedValue);
    });

  expect(expectedValue).to.equal(testWriter.logMessages[0].properties[expectedKey]);
});

it('WhenLoggingAtWarningLevel_WithMultipleProperties_ThenLogsProperties', () => {
  let expectedKeyOne = 'customer_hash';
  let expectedKeyTwo = 'email_hash';
  let expectedValueOne = 'sdfsdfsd';
  let expectedValueTwo = 'wetyuty';

  logger.Warn((logBuilder) => {
      logBuilder.withMessage('Hello World')
                .withProperty(expectedKeyOne, expectedValueOne)
                .withProperty(expectedKeyTwo, expectedValueTwo);
  });

expect(expectedValueOne).to.equal(testWriter.logMessages[0].properties[expectedKeyOne]);
expect(expectedValueTwo).to.equal(testWriter.logMessages[0].properties[expectedKeyTwo]);
});

it('WhenLoggingAtWarningLevel_WithTags_ThenLogsTags', () => {
  let expectedTag = 'success';

  logger.Warn((logBuilder) => {
      logBuilder.withMessage('Hello World')
                .withTag(expectedTag);
  });
  
expect(expectedTag).to.equal(testWriter.logMessages[0].tags[0]);
});

it('WhenLoggingAtWarningLevel_WithMultipleTags_ThenLogsTags', () => {
  let expectedTagOne = 'success';
  let expectedTagTwo = 'failure';

  logger.Warn((logBuilder) => {
      logBuilder.withMessage('Hello World')
                .withTag(expectedTagOne)
                .withTag(expectedTagTwo);
  });
  
expect(testWriter.logMessages[0].tags.indexOf(expectedTagOne) > -1).to.equal(true);
expect(testWriter.logMessages[0].tags.indexOf(expectedTagTwo) > -1).to.equal(true);
});
});
