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

mongoose.connect('mongodb://localhost:28019/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function(){
  console.log('mongoose connected to mongo???');
  // console.log('db',db);
});

app.use(require('./api-routes.js')());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => { res.render('index.ejs'); });
app.get('/#', (req, res) => { res.render('app.ejs'); });

var port = process.env.PORT || 5056;

app.listen(port, function(){
  console.log('listening to port',port);
})
