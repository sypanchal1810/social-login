const catchAsync = require('../utils/catchAsync');

exports.getLoginFrom = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: `Login`,
  });
});

exports.getProfilePage = catchAsync(async (req, res, next) => {
  const user = req.session.passport.user;
  // console.log(user);

  res.status(200).render('profile', {
    title: `My Account`,
    user,
  });
});

exports.logoutUser = catchAsync(async (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
  });
  res.redirect('/');
});
