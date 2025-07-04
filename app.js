const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const accountRouter = require('./routes/account');
const adminRouter = require('./routes/admin');
const categoryRouter = require('./routes/category');
const historyRouter = require('./routes/history');
const homeRouter = require('./routes/home');
const loginRouter = require('./routes/login');
const medicationRouter = require('./routes/medication');
const saveRouter = require('./routes/save');
const scheduleRouter = require('./routes/schedule');
const permissionsRouter = require('./routes/permissions')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter)
app.use('/account', accountRouter);
app.use('/category', categoryRouter);
app.use('/history', historyRouter);
app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/medication', medicationRouter);
app.use('/save', saveRouter);
app.use('/schedule', scheduleRouter);
app.use('/permissions', permissionsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;