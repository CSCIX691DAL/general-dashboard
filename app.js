var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var api = require('./routes/api');
const events = require("./src/api/events");
const {Sequelize} = require('sequelize')

var app = express();

const sequelize = new Sequelize('x691_G_dashboard', 'x691_G_student', 'yED3IX83k3BDYrCS', {
  host: 'db.cs.dal.ca',
  dialect: 'mysql',
  port: 3306,
  pool: {
    max: 10,
    min: 0,
    idle: 20000
  }
});

// configure database connection here

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
// app.use('/books', express.static(path.join(__dirname, 'dist')));

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use('/home', express.static(path.join(__dirname, 'dist')));
app.use('/registration', express.static(path.join(__dirname, 'dist')));
app.use('/login', express.static(path.join(__dirname, 'dist')));
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
