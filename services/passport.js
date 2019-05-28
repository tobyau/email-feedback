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
    callbackURL: '/auth/google/callback'
  },
  // callback function, done is a callback
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleID: profile.id }).then(existingUser => {
      if(existingUser) {  // if exists, we already have a record with given ID
        done(null, existingUser);
      }
      else { // we dont have user record
        new User({ googleID: profile.id })  // creates new model instance
          .save() // saves model instance to db
          .then(user => done(null, user));
      }
    });
  })
);
