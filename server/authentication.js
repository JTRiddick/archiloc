var mongoose = require('mongoose');
var PassportLocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;



module.exports = function(passport){

  passport.serializeUser(function(user,done){

    done(null,user.id);
  });

  passport.deserializeUser(function(user,done){
    user.findById(id,function(err,user){
      done(err,user);
    });
  });


  passport.use('local-login', new PassportLocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, email, password, done) {

      var success = function(user) {
        done(null, user);
      }

      var failure = function() {
        done(null, false, { message: 'Invalid login' });
      }

      User.findOne({email: email}, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, null);
        }

        user.checkPassword(password, user.password, function(err, isMatch) {
          if (err) { return done(err); }
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, null);
          }
        });
      });

      // datasource.validateLogin(username, password, success, failure);
    }
  ));

  passport.use('local-create-account',
    new PassportLocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, email, password, done) {

      var newUser = new User({
        email: email,
        password: password
      });
      newUser.save(function(err, user) {
        done(null, user);
      });
    })
  );

}
