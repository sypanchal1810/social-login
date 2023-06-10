const passport = require('passport');
const { Strategy } = require('passport-linkedin-oauth2');

// Passport.js for Facebook
const linkedinOptions = {
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: '/auth/linkedin/callback',
  scope: ['r_emailaddress', 'r_liteprofile'],
  state: true,
};
const verifyCallback = async (accessToken, refreshToken, profile, done) => {
  // console.log(profile);
  return done(null, profile);
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
