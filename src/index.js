/*

Authors: Serdar Ulutas, Lizzie Tse

*/

'use strict';

require('dotenv/config');
const cors = require('cors');
const helmet = require('helmet');
const expressSanitize = require('express-mongo-sanitize');
const express = require('express');
const MongoStore = require('connect-mongo');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const sanitizeBody = require('./middleware/sanitizeBody');
const compression = require('compression');

const personRouter = require('./router/person');
const { errorHandler } = require('./utils/errors');
const authRouter = require('./router/auth');

require('./utils/db');

const app = express();
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,DELETE,OPTIONS,PATCH'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers'
  );
  next();
});
app.use(helmet());
app.use(compression());
app.use(expressSanitize());
app.use(
  cors({
    origin: process.env.CORS_WHITELIST.split(','),
  })
);
app.use(express.json());
app.use(morgan('tiny'));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (_req, res) => res.send('Server running'));
app.use('/auth', authRouter);
app.use('/api/people', sanitizeBody, personRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
