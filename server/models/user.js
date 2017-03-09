var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var SALT_FACTOR = 10;

var schema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  privilege: {type: Boolean, default: false}
});

schema.methods.checkPassword = (guess, actual, done) => {
  bcrypt.compare(guess, actual, function(err, isMatch) {
    done(err, isMatch);
  });
};

var noop = () => {};

schema.pre('save', function(done) {
  var user = this;
  if (!user.isModified('password')) {
    return done();
  }
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) { return done(err); }

    bcrypt.hash(user.password, salt, noop, function(err, hashedPassword) {
      if (err) { return done(err); }

      user.password = hashedPassword;
      done();
    })
  });
});

var User = mongoose.model('User', schema);
module.exports = User;
