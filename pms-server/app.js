var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var systemRouter = require('./routes/system');
var usersRouter = require('./routes/users');
var communityRouter = require('./routes/community');
var buildingRouter = require('./routes/building');
var householdRouter = require('./routes/household');
var parkRouter = require('./routes/park');

var staffRouter = require('./routes/staff');
var positionRouter = require('./routes/position');
var maintainRouter = require('./routes/mantain');
var complaintRouter = require('./routes/complaint');

var feeRouter = require('./routes/fee');
var feeSubRouter = require('./routes/feeSub');



var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/system', systemRouter);
app.use('/users', usersRouter);
app.use('/api',apiRouter);
app.use('/community',communityRouter);
app.use('/building',buildingRouter);
app.use('/household',householdRouter);
app.use('/park',parkRouter);

app.use('/staff',staffRouter);
app.use('/position',positionRouter);
app.use('/maintain',maintainRouter);
app.use('/complaint',complaintRouter);

app.use('/fee',feeRouter);
app.use('/feesub',feeSubRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
