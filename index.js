// npm run dev to start nodemon server
// This file is associated with booting up application

const express = require('express'); // import express
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport'); // compiles things in passport.js

mongoose.connect(keys.mongoURI); // connect mongoose to remote mongoDB in mongoDB Atlas

const app = express(); // express() generates a new express application

// enabling cookies in our app
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // how long this cookie can exist in browser before it expires
    keys: [keys.cookieKey] // used to encrypt cookie, allows to provide multiple keys and randomly picks one
  })
);

// telling passport to use cookies to manage authentication
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

// heroku provide port ( process.env.PORT )
const PORT = process.env.PORT || 5000
app.listen(PORT);
