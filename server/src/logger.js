const fs = require('fs');

class ConsoleLogger {
  static log(msg) {
    console.log(`[${new Date().toISOString()}] ${msg}`);
  }
}
class FileLogger {
  static log(msg) {
    const logDir = `${process.env.PWD}/logs/`;
    const filename = `${new Date().toISOString().substring(0, 10)}.log`;

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    const filepath = `${logDir}/${filename}`;

    fs.appendFileSync(filepath, `[${new Date().toISOString()}] ${msg}\n`);
  }
}

class LoggerSingletonFacade {
  constructor(defaultLoggerType) {
    const instance = LoggerSingletonFacade.instance;
    if (instance) return instance;

    LoggerSingletonFacade.instance = this;
    this.defaultType = defaultLoggerType;
  }

  static loggers = {
    console: ConsoleLogger,
    file: FileLogger,
  };

  log(msg) {
    LoggerSingletonFacade.loggers[this.defaultType].log(msg);
  }
}

module.exports = {
  LoggerSingletonFacade,
};
