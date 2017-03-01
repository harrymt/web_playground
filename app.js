"use strict";

// Get other server side code
var server_side_code = require( __dirname + '/server/main.js');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var compression = require('compression');

var pages = require('./routes/pages');
var report = require('./routes/report');

var app = express().use(function (req, res, next) {
  if (req.app.get('env') !== 'development' ? req.header('x-forwarded-proto') == 'http' : false) {
    res.redirect(301, 'https://' + req.get('Host') + req.url)
    return
  }
  next()
});

// Secure the Express app by setting various HTTP headers.
app.use(helmet());

// Compress all routes
app.use(compression());



// Set css, js and images for a static serve
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Report will render with PDF
app.use('/', report);

// Perform content negotiation
app.use(server_side_code.handleContent);

/**
 * Route every other page.
 */
app.use('/', pages);


/*
 * ERROR HANDLING
 *
 * Below this line are all the error handling functions.
 *
 */

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
