const passport = require('passport');
const { Strategy } = require('passport-facebook');

// Passport.js for Facebook
const facebookOptions = {
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: '/auth/facebook/callback',
};
const verifyCallback = async (accessToken, refreshToken, profile, done) => {
  const userProfile = profile;
  console.log(userProfile);
  return done(null, userProfile);
};
passport.use(new Strategy(facebookOptions, verifyCallback));

// Save the session to the cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

// Read the session from the cookie
passport.deserializeUser((user, done) => {
  done(null, user);
});
