var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:28019/test')


app.use(express.static('public'));

var port = process.env.PORT || 5056;

app.listen(port, function(){
  console.log('listening to port',port);
})
