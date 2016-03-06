var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var ariInit = require('./ari/ari-init.js');
var ariConfig = {url: 'http://192.168.0.97:8088', username: 'plomba97', password: 'plomba97'};

ariInit.getClient(ariConfig, 'testPeople')
    .then(function (client) {
        console.log('client connected to host: ', client._connection.host);
    })
    .catch(function(err){
        console.log(err);
    });

mongoose.connect('mongodb://localhost/testPeople');


var routes = require('./routes/index');
var users = require('./routes/users');
var people = require('./routes/people');
var inform = require('./routes/inform');
var groups = require('./routes/groups');
var data = require('./routes/data');
var login = require('./routes/users');

var app = express();

app.locals.moment = require('moment');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/people', people);
app.use('/inform', inform);
app.use('/groups', groups);
app.use('/data', data);
app.use('/login', login);

var Account = require('./data-models/account-model');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('partials/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('partials/error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
