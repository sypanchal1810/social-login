const passport = require('passport');
const { Strategy } = require('passport-linkedin-oauth2');

// Passport.js for Facebook
const linkedinOptions = {
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: '/auth/linkedin/callback',
};
const verifyCallback = async (accessToken, refreshToken, profile, done) => {
  const userProfile = profile;
  console.log(userProfile);
  return done(null, userProfile);
};
passport.use(new Strategy(linkedinOptions, verifyCallback));

// Save the session to the cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

// Read the session from the cookie
passport.deserializeUser((user, done) => {
  done(null, user);
});
