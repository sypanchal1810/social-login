const compression = require('compression');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const passport = require('passport');

const appError = require('./utils/appErrors');
// const catchAsync = require('./utils/catchAsync');
const globalErrorHandler = require('./controllers/errorController');
const viewController = require('./controllers/viewController');

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
    failureRedirect: '/',
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
    failureRedirect: '/',
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
app.use('/', viewController.getLoginFrom);
app.use('/my-account', checkLoggedIn, viewController.getProfilePage);

app.use('/logout', viewController.logoutUser);

app.all('*', (req, res, next) => {
  next(new appError(`Cannot find the ${req.originalUrl} on this server!!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
