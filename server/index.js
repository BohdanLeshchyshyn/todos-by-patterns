const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { json } = require('body-parser');

const config = require('./config.js');
const { taskRouter } = require('./src/routes/task.js');
const { LoggerSingletonFacade: Logger } = require('./src/logger');
const { requestLoggableProxy } = require('./src/requestLoggableProxy.js');

const isProd = process.env.NODE_ENV === 'production';

const logger = new Logger(isProd ? 'file' : 'console');
const app = express();

app.use(cors());
app.use(json());

app.use(taskRouter);

app.all(
  '*',
  requestLoggableProxy((_, res) => {
    res.send('Hi there');
  }),
);

if (!config.MONGO_URI) {
  logger.log('MONGO_URI must be defined');
  throw new Error('MONGO_URI must be defined');
}

try {
  mongoose
    .connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      logger.log('connected to mongodb');
    });
} catch (error) {
  logger.log(error);
}

app.listen(config.APP_PORT, () => {
  logger.log(`Listening on port ${config.APP_PORT}!`);
});
