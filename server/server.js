var path = require('path');
var express = require('express');
var session = require('express-session')
var bodyParser = require("body-parser");
var mongoose = require('mongoose');


var app = express();

var router = express.Router();
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//process.env.MONGODB_URI
//should be mongodb:<jtr>:<dmc12prv>@ds011902.mlab.com:11902/heroku_x2r8tl0m'|| 'mongodb://localhost:28019/test
var dbLocation = process.env.MONGODB_URI || 'mongodb://localhost:28019/test';
mongoose.connect(dbLocation);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function(){
  console.log('mongoose connected to mongo???');
  // console.log('db',db);
});

app.use(require('./api-routes.js')());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => { res.render('app.ejs'); });
// app.get('/'),(req, res) => {res.render('index.ejs');})
// app.get('/map', (req, res) => { res.render('app.ejs'); });


var port = process.env.PORT || 5056;

app.listen(port, function(){
  console.log('listening to port',port);
})
