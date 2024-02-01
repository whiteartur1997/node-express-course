const express = require('express');
const morgan = require('morgan');

const globalErrorHandler = require('./controllers/errorController');
const usersRouter = require('./routes/usersRouter');
const toursRouter = require('./routes/toursRouter');
const AppError = require('./utils/AppError');

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

app.all('*', (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl} on the server`, 404);
  // when you call next with err param
  // express automatically defines, that there is an error
  // and skip all others middlewares in the chain
  // straight to the error handling chain
  next(err);
});

// when we pass 4 params into middleware, express automatically understand
// that this is an error handler middleware
app.use(globalErrorHandler);

module.exports = app;
