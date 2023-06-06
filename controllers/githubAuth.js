const passport = require('passport');
const { Strategy } = require('passport-github2');

// Passport.js for Facebook
const githubOptions = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: '/auth/github/callback',
};
const verifyCallback = async (accessToken, refreshToken, profile, done) => {
  const userProfile = profile;
  console.log(userProfile);
  return done(null, userProfile);
};
passport.use(new Strategy(githubOptions, verifyCallback));

// Save the session to the cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

// Read the session from the cookie
passport.deserializeUser((user, done) => {
  done(null, user);
});
