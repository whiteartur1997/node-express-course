const express = require('express');
const morgan = require('morgan');

const usersRouter = require('./routes/usersRouter');
const toursRouter = require('./routes/toursRouter');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// we need this middleware just to be able to access req.data
app.use(express.json());
// serve static files from the route specified
app.use(express.static(`${__dirname}/public`));
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;
