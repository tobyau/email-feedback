const passport = require('passport'); // requiring passport npm module

module.exports = app => {
  // 'google' string for google strategy that is created in strategy backend
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // handle case of routing to callback url
  app.get('/auth/google/callback', passport.authenticate('google'))

  app.get('/api/logout', (req, res) => {
    req.logout(); // kills the cookie
    res.send(req.user); // confirms user is removed
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user); // checks to make sure it accesses user
  });
};
