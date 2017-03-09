// account authentication sub router
var express = require('express');
var userdata = require('./userdata.js');
var flash = require('connect-flash');

var alreadyAuthed = (req,res,next) => {
  var isAuthed = req.isAuthenticated();
  if(isAuthed){
    console.log('authorized');
    req.flash('info', 'flash test')
    res.redirect('/app');
    return;
  }
  next();
}

module.exports = function(passport){

  var router = express.Router();

  //login
  router.get('/login', alreadyAuthed, function(req,res){
    res.render('login.ejs')
  });

  router.post('/login',
    passport.authenticate('local-login',
  { successRedirect:'/app',
    failureRedirect:'/' }),

    function (req,res){
      console.log(this,'login callback?');
    
    }
  );

  router.get('/logout', function(req,res){
    req.logout();
    res.redirect('/app');
  });

  //create account
  router.get('/create-account', alreadyAuthed, function(req,res){
    res.render('create_account.ejs');
  });

  router.post('/create-account', passport.authenticate('local-create-account',
  {successRedirect:'/app',failureRedirect:'/create-account'}),
  function(req,res){
    console.log('create account');
  }
  );

return router;

}//end of module.exports
