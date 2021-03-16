var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var api = require('./routes/api');


var app = express();


// configure database connection here

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
// app.use('/books', express.static(path.join(__dirname, 'dist')));

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use('/home', express.static(path.join(__dirname, 'dist')));
app.use('/registration', express.static(path.join(__dirname, 'dist')));
app.use('/login', express.static(path.join(__dirname, 'dist')));
app.use('/userhome', express.static(path.join(__dirname, 'dist')));
app.use('/reports', express.static(path.join(__dirname, 'dist')));
app.use('/admin-report-page', express.static(path.join(__dirname, 'dist')));
app.use('/admin-users-page', express.static(path.join(__dirname, 'dist')));
app.use('/admin-databases-page', express.static(path.join(__dirname, 'dist')));
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
