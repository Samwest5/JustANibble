const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const favicon = require('serve-favicon');
const auth = require('./controllers/auth');

let recipesRouter = require('./routes/recipes');
let drinksRouter = require('./routes/drinks');
let aboutRouter = require('./routes/about');
let authRouter = require('./routes/auth');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
app.use(auth.assignUsernameWriter);

app.use('/', recipesRouter);
app.use('/about', aboutRouter);
app.use('/drinks', drinksRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  err.status = (err.status || 500);
  res.render('error', {error_status: err.status});
  console.log({
    status: err.status,
    message: err.message,
    stack: err.stack,
    sql: err.sql
  })
});

module.exports = app;
