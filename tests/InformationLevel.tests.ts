import { expect } from 'chai'
import { LogBuilder } from '../src/LogBuilder';
import { LogLevel } from '../src/LogLevel';
import { TestWriter } from './TestWriter';
import { TestEnricher } from './TestEnricher';

let testWriter = new TestWriter();

let testEnricher = new TestEnricher();
let builder = new LogBuilder();
let context = 'InformationLevel.test.ts';
let logger = builder.setContext(context)
                       .writeTo(testWriter)
                       .enrichWith(testEnricher)
                       .setMinimumLevel(LogLevel.Info)
                       .createLogger();

beforeEach(() => {
  testWriter.logMessages = [];
  testEnricher.messageLogs = [];  
});

describe('GivenLoggerSetToInformationLevel', () => {
 
    it('WhenLoggingAtInformationLevel_ThenLogsMessageAsInformation', () => {    

        logger.Information((logBuilder) => {
            logBuilder.withMessage('Hello World');
        });

      expect(LogLevel.Info).to.equal(testWriter.logMessages[0].level);
    });

    it('WhenLogging_WithEnricher_ThenCallsEnrichers', () => {    
      
        logger.Information((logBuilder) => {
            logBuilder.withMessage('Hello World');
        });

      expect(1).to.equal(testEnricher.messageLogs.length);
    });
  
    it('WhenLoggingAtInformationLevel_ThenLogsMessage', () => {
        let expectedMessage = 'Hello World';

        logger.Information((logBuilder) => {
            logBuilder.withMessage(expectedMessage);
        });

      expect(expectedMessage).to.equal(testWriter.logMessages[0].message);
    });

    it('WhenLoggingAtInformationLevel_ThenOnlyCallsWriterOnce', () => {
        let expectedMessage = 'Hello World';

        logger.Information((logBuilder) => {
            logBuilder.withMessage(expectedMessage);
        });

      expect(1).to.equal(testWriter.logMessages.length);
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

it('WhenLoggingAtWarningLevel_ThenLogsMessage', () => {
  logger.Warn((logBuilder) => {
      logBuilder.withMessage('Hello World');
  });

expect(1).to.equal(testWriter.logMessages.length);
});

it('WhenLoggingAtErrorLevel_ThenLogsMessage', () => {
  logger.Error((logBuilder) => {
      logBuilder.withMessage('Hello World');
  });

expect(1).to.equal(testWriter.logMessages.length);
});

    it('WhenLoggingAtInformationLevel_ThenLogsContext', () => {
      logger.Information((logBuilder) => {
          logBuilder.withMessage('Hello World');
      });

    expect(context).to.equal(testWriter.logMessages[0].context);
  });

  it('WhenLoggingAtInformationLevel_WithMethod_ThenLogsMethod', () => {
    let expectedMethod = 'someMethod';

    logger.Information((logBuilder) => {
        logBuilder.withMessage('Hello World');
    }, expectedMethod);

    expect(expectedMethod).to.equal(testWriter.logMessages[0].method);
  });

  it('WhenLoggingAtInformationLevel_WithProperties_ThenLogsProperties', () => {
    let expectedKey = 'customer_hash';
    let expectedValue = 'sdfsdfsd';

    logger.Information((logBuilder) => {
        logBuilder.withMessage('Hello World')
                  .withProperty(expectedKey, expectedValue);
    });

  expect(expectedValue).to.equal(testWriter.logMessages[0].properties[expectedKey]);
});

it('WhenLoggingAtInformationLevel_WithMultipleProperties_ThenLogsProperties', () => {
  let expectedKeyOne = 'customer_hash';
  let expectedKeyTwo = 'email_hash';
  let expectedValueOne = 'sdfsdfsd';
  let expectedValueTwo = 'wetyuty';

  logger.Information((logBuilder) => {
      logBuilder.withMessage('Hello World')
                .withProperty(expectedKeyOne, expectedValueOne)
                .withProperty(expectedKeyTwo, expectedValueTwo);
  });

expect(expectedValueOne).to.equal(testWriter.logMessages[0].properties[expectedKeyOne]);
expect(expectedValueTwo).to.equal(testWriter.logMessages[0].properties[expectedKeyTwo]);
});

it('WhenLoggingAtInformationLevel_WithTags_ThenLogsTags', () => {
  let expectedTag = 'success';

  logger.Information((logBuilder) => {
      logBuilder.withMessage('Hello World')
                .withTag(expectedTag);
  });
  
expect(expectedTag).to.equal(testWriter.logMessages[0].tags[0]);
});

it('WhenLoggingAtInformationLevel_WithMultipleTags_ThenLogsTags', () => {
  let expectedTagOne = 'success';
  let expectedTagTwo = 'failure';

  logger.Information((logBuilder) => {
      logBuilder.withMessage('Hello World')
                .withTag(expectedTagOne)
                .withTag(expectedTagTwo);
  });
  
expect(testWriter.logMessages[0].tags.indexOf(expectedTagOne) > -1).to.equal(true);
expect(testWriter.logMessages[0].tags.indexOf(expectedTagTwo) > -1).to.equal(true);
});
});
