const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// user refers to the User instance with user model from db
// user is pulled out of db
// done ( error message, identify user )
// turn user instance to id
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// turn the id back to a user instance
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    // after user grants permission, send them to callbackURL
    callbackURL: '/auth/google/callback',
    proxy: true // calculates http vs https
  },
    // callback function, done is a callback
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleID: profile.id })
      if(existingUser) {
        // if exists, we already have a record with given ID
        return done(null, existingUser);
      }
      // we dont have user record
      const user = await new User({ googleID: profile.id }).save() // saves new model instance to db
      done(null, user);
    }
  )
);
