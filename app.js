const express = require('express');
const chalk = require('chalk');

const app = express();
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const sauceRouter = require('./routes/sauceRoutes');

//For generating req.body
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  // eslint-disable-next-line no-console
  console.log(chalk.bgBlue.bold(`MODE: ${process.env.NODE_ENV}`));
} else {
  // eslint-disable-next-line no-console
  console.log(chalk.bgMagenta.bold(`MODE: ${process.env.NODE_ENV}`));
}

//Sauce Routes
app.use('/sauces', sauceRouter);

//Error Handlers
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  // const err = new Error('WAAAAAT');
  // err.status = 'fail';
  // err.statusCode = 404;
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });
});

//Global Error Middleware
app.use(globalErrorHandler);

module.exports = app;
