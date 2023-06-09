const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

// Passport.js for OAuth Google
const googleOAuthOptions = {
  clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
};
const verifyCallback = async (accessToken, refreshToken, profile, done) => {
  // console.log(profile);
  return done(null, profile);
};
passport.use(new Strategy(googleOAuthOptions, verifyCallback));

// Save the session to the cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

// Read the session from the cookie
passport.deserializeUser((user, done) => {
  done(null, user);
});
