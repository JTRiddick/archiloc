var path = require('path');
var express = require('express');
var session = require('express-session')
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser'); //cookie parser no longer necessary
var userdata = require('./userdata.js');
var port = process.env.PORT || 5056;

var app = express();

var router = express.Router();
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var dbLocation = process.env.MONGODB_URI || 'mongodb://localhost:28019/test';
mongoose.connect(dbLocation);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function(){
  console.log('mongoose connected to mongo???');
  // console.log('db',db);
});


app.get('/', (req, res) => { res.render('index.ejs'); });

//api routes
app.use(require('./api-routes.js')(passport));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

//passport=========================================

app.use(session({secret: 'howmuchdoesyourbuildingweigh',resave: false,
  saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); //flash messages stored in session


require('./authentication.js')(passport); // Where the authentication configuration is

app.get('/api/raw/users', function(req, res) {
  User.find()
    .exec(function(err, users) {
      res.send(users);
    });
});

// In every view we need to know if they are authenticated for the header, so add to locals
app.use(function(req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});


// The routes for the authentication stuff goes in this separate route file.
app.use(require('./account-routes.js')(passport));
// All routes after this point require authentication
app.use(function(req, res, next) {
  var isAuthed = req.isAuthenticated();
  if (!isAuthed) {
    console.log("redirected to login");
    res.redirect('/login');
    return;
  }

  next();
});

app.get('/app', function(req,res){
  passport.authenticate('local');
  res.render('app.ejs');
});


// ================================================



app.listen(port, function(){
  console.log('listening to port',port);
})
