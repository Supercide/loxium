import { LogBuilder } from '../src/LogBuilder';
import { LogLevel } from '../src/LogLevel';
import { TestWriter } from './TestWriter';
import { TestEnricher } from './TestEnricher';

let testWriter = new TestWriter();
let testEnricher = new TestEnricher();

let builder = new LogBuilder();
let context = 'DebugLevel.test.ts';
let logger = builder.setContext(context)
                       .writeTo(testWriter)
                       .enrichWith(testEnricher)
                       .setMinimumLevel(LogLevel.Debug)
                       .createLogger();

beforeEach(() => {
  testWriter.logMessages = [];
  testEnricher.messageLogs = [];
});

describe('GivenLoggerSetToWarningLevel', () => {
 
    it('WhenLoggingAtDebugLevel_ThenLogsMessageAsDebug', () => {    

        logger.Debug((logBuilder) => {
            logBuilder.withMessage('Hello World');
        });

      expect(LogLevel.Debug).toEqual(testWriter.logMessages[0].level);
    });

    it('WhenLogging_WithEnricher_ThenCallsEnrichers', () => {    
      
        logger.Debug((logBuilder) => {
            logBuilder.withMessage('Hello World');
        });

      expect(1).toEqual(testEnricher.messageLogs.length);
    });
  
    it('WhenLoggingAtDebugLevel_ThenLogsMessage', () => {
        let expectedMessage = 'Hello World';

        logger.Debug((logBuilder) => {
            logBuilder.withMessage(expectedMessage);
        });

      expect(expectedMessage).toEqual(testWriter.logMessages[0].message);
    });

    it('WhenLoggingAtDebugLevel_ThenOnlyCallsWriterOnce', () => {
        let expectedMessage = 'Hello World';

        logger.Debug((logBuilder) => {
            logBuilder.withMessage(expectedMessage);
        });

      expect(1).toEqual(testWriter.logMessages.length);
    });

    it('WhenLoggingAtInformationLevel_ThenDoesNotLogMessage', () => {
      logger.Information((logBuilder) => {
          logBuilder.withMessage('Hello World');
      });

    expect(1).toEqual(testWriter.logMessages.length);
  });

it('WhenLoggingAtTraceLevel_ThenDoesNotLogMessage', () => {
  logger.Trace((logBuilder) => {
      logBuilder.withMessage('Hello World');
  });

expect(0).toEqual(testWriter.logMessages.length);
});

it('WhenLoggingAtWarningLevel_ThenLogsMessage', () => {
  logger.Warn((logBuilder) => {
      logBuilder.withMessage('Hello World');
  });

expect(1).toEqual(testWriter.logMessages.length);
});

it('WhenLoggingAtErrorLevel_ThenLogsMessage', () => {
  logger.Error((logBuilder) => {
      logBuilder.withMessage('Hello World');
  });

expect(1).toEqual(testWriter.logMessages.length);
});

    it('WhenLoggingAtDebugLevel_ThenLogsContext', () => {
      logger.Debug((logBuilder) => {
          logBuilder.withMessage('Hello World');
      });

    expect(context).toEqual(testWriter.logMessages[0].context);
  });

  it('WhenLoggingAtDebugLevel_WithMethod_ThenLogsMethod', () => {
    let expectedMethod = 'someMethod';

    logger.Debug((logBuilder) => {
        logBuilder.withMessage('Hello World');
    }, expectedMethod);

    expect(expectedMethod).toEqual(testWriter.logMessages[0].method);
  });

  it('WhenLoggingAtDebugLevel_WithProperties_ThenLogsProperties', () => {
    let expectedKey = 'customer_hash';
    let expectedValue = 'sdfsdfsd';

    logger.Debug((logBuilder) => {
        logBuilder.withMessage('Hello World')
                  .withProperty(expectedKey, expectedValue);
    });

  expect(expectedValue).toEqual(testWriter.logMessages[0].properties[expectedKey]);
});

it('WhenLoggingAtDebugLevel_WithMultipleProperties_ThenLogsProperties', () => {
  let expectedKeyOne = 'customer_hash';
  let expectedKeyTwo = 'email_hash';
  let expectedValueOne = 'sdfsdfsd';
  let expectedValueTwo = 'wetyuty';

  logger.Debug((logBuilder) => {
      logBuilder.withMessage('Hello World')
                .withProperty(expectedKeyOne, expectedValueOne)
                .withProperty(expectedKeyTwo, expectedValueTwo);
  });

expect(expectedValueOne).toEqual(testWriter.logMessages[0].properties[expectedKeyOne]);
expect(expectedValueTwo).toEqual(testWriter.logMessages[0].properties[expectedKeyTwo]);
});

it('WhenLoggingAtDebugLevel_WithTags_ThenLogsTags', () => {
  let expectedTag = 'success';

  logger.Debug((logBuilder) => {
      logBuilder.withMessage('Hello World')
                .withTag(expectedTag);
  });
  
expect(expectedTag).toEqual(testWriter.logMessages[0].tags[0]);
});

it('WhenLoggingAtDebugLevel_WithMultipleTags_ThenLogsTags', () => {
  let expectedTagOne = 'success';
  let expectedTagTwo = 'failure';

  logger.Debug((logBuilder) => {
      logBuilder.withMessage('Hello World')
                .withTag(expectedTagOne)
                .withTag(expectedTagTwo);
  });
  
expect(testWriter.logMessages[0].tags.indexOf(expectedTagOne) > -1).toEqual(true);
expect(testWriter.logMessages[0].tags.indexOf(expectedTagTwo) > -1).toEqual(true);
});
});
