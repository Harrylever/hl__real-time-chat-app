require('dotenv/config');
const express = require('express');
const expressMonitor = require('express-status-monitor')();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const createError = require('http-errors');

const { connect } = require('mongoose');
const { mongoUri } = require('./config/const');
const indexRoute = require('./routes/index.route');
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const chatRoute = require('./routes/chat.route');
const messageRoute = require('./routes/message.route');

const app = express();

app.use(expressMonitor);
app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use((req, res, next) => {
  const datey = new Date();
  // eslint-disable-next-line no-console
  console.log(
    `${
      datey.getUTCHours() + 1
    }:${datey.getUTCMinutes()}:${datey.getUTCSeconds()}`,
  );
  next();
});

app.use(express.json({ limit: '60mb' }));
app.use(express.urlencoded({ extended: false, limit: '60mb' }));
app.use(cookieParser());

connect(mongoUri, { dbName: 'realChatAppDb' })
  .then(() => {
    console.log('connected to database 🚀');
  })
  .catch((err) => console.log(`MongoDB connection failed: ${err.message}`));

app.get('/', (req, res) => {
  res.redirect(301, '/api/v1');
});

// CRUD Routes
app.use('/api/v1', indexRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/chats', chatRoute);
app.use('/api/v1/messages', messageRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = { app };
