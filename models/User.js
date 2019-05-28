const mongoose = require('mongoose');
const { Schema } = mongoose; // destructuring

const userSchema = new Schema({
  googleID: String
});

// creates model class
// creating a new collection of users if it does not exist
mongoose.model('users', userSchema);
