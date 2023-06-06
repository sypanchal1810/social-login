const compression = require('compression');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const passport = require('passport');
const MongoStore = require('connect-mongo');

const appError = require('./utils/appErrors');
const globalErrorHandler = require('./controllers/errorController');
const viewController = require('./controllers/viewController');

const app = express();

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// All Middleware

// Implementing CORS
app.use(cors());
app.options('*', cors());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
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
require('./controllers/googleAuth');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 3600 * 1000,
    },
    store: MongoStore.create({
      mongoUrl: `${DB}`,
      collectionName: 'sessions',
    }),
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
// Github Login
require('./controllers/githubAuth');

app.get('/auth/github', passport.authenticate('github'));

app.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/',
    session: true,
  }),
  async (req, res, next) => {
    console.log('Callback from github');
    // console.log(req.session.passport.user);
    res.redirect('/my-account');
  }
);
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
// Linkedin Login
require('./controllers/linkedinAuth');

app.get('/auth/linkedin', passport.authenticate('linkedin'));

app.get(
  '/auth/linkedin/callback',
  passport.authenticate('linkedin', {
    failureRedirect: '/',
    session: true,
  }),
  async (req, res, next) => {
    console.log('Callback from linkedin');
    // console.log(req.session.passport.user);
    res.redirect('/my-account');
  }
);
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
app.get('/', viewController.getLoginFrom);
app.get('/my-account', checkLoggedIn, viewController.getProfilePage);

app.get('/logout', viewController.logoutUser);

app.all('*', (req, res, next) => {
  next(new appError(`Cannot find the ${req.originalUrl} on this server!!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
