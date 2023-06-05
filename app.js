const compression = require('compression');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const passport = require('passport');

const appError = require('./utils/appErrors');
const catchAsync = require('./utils/catchAsync');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware

// Implementing CORS
app.use(cors());

app.options('*', cors());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
// app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// Compress the size of response body for faster transmission and improved performance
app.use(compression());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//////////////////////////////////////////////////////
// Google Login
require('./controllers/googleOAuth');

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: true,
  }),
  async (req, res, next) => {
    console.log('Callback from google');
    // console.log(req.session.passport.user);
    res.redirect('/my-account');
  }
);
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
// Facebook Login
require('./controllers/facebook');

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    session: true,
  }),
  async (req, res, next) => {
    console.log('Callback from facebook');
    // console.log(req.session.passport.user);
    res.redirect('/my-account');
  }
);

//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
function checkLoggedIn(req, res, next) {
  console.log('Current user is:', req.session.passport.user.displayName);

  if (!req.isAuthenticated()) {
    return res.status(401).json({
      error: 'You must log in!',
    });
  }
  next();
}

// Mounting the routers
// Own Middleware
app.use(
  '/login',
  catchAsync(async (req, res, next) => {
    res.status(200).render('login', {
      title: `Login`,
    });
  })
);

app.use(
  '/my-account',
  checkLoggedIn,
  catchAsync(async (req, res, next) => {
    const user = req.session.passport.user;
    // console.log(user);

    res.status(200).render('profile', {
      title: `My Account`,
      user,
    });
  })
);

app.use(
  '/logout',
  catchAsync(async (req, res, next) => {
    req.logout(err => {
      if (err) return next(err);
    });
    res.redirect('/login');
  })
);

app.all('*', (req, res, next) => {
  next(new appError(`Cannot find the ${req.originalUrl} on this server!!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
