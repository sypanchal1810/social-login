const catchAsync = require('../utils/catchAsync');

exports.getLoginFrom = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: `Login`,
  });
});

exports.getProfilePage = catchAsync(async (req, res, next) => {
  const user = req.session.passport.user;
  const loggedUser = {};

  if (user.provider === 'google') {
    loggedUser.provider = 'google';
    loggedUser.id = user.id;
    loggedUser.name = user.displayName;
    loggedUser.email = user.emails[0].value;
    loggedUser.photo = user.photos[0].value;
  }

  if (user.provider === 'github') {
    loggedUser.provider = 'github';
    loggedUser.id = user.id;
    loggedUser.name = user.displayName;
    loggedUser.profileUrl = user.profileUrl;
    loggedUser.photo = user.photos[0].value;
  }

  if (user.provider === 'linkedin') {
    loggedUser.provider = 'linkedin';
    loggedUser.id = user.id;
    loggedUser.name = user.displayName;
    loggedUser.email = user.emails[0].value;
    loggedUser.photo = user.photos[2].value;
  }

  res.status(200).render('profile', {
    title: `My Account`,
    user: loggedUser,
  });
});

exports.logoutUser = (req, res, next) => {
  req.session.user = null;

  req.logout(err => {
    if (err) console.log('Error', err);
  });
  console.log('Logging Out...');
  res.clearCookie('session', { path: '/' }).status(200).redirect('/');
};
