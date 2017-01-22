var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var app = express();

var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:28019/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function(){
  console.log('mongoose connected to mongo???');
  console.log('db',db);
});

//mongo test

// var trashSchema = mongoose.Schema({
//   id: Number,
//   name: String
// });
//
// var PopTart = mongoose.model('PopTart',trashSchema);
//
// var cherry = new PopTart({id:1,name:'Cherry mit Frosting'});
// console.log(cherry.name);
// console.log(cherry.id);
// console.log(cherry._id);



  var Shed = require('./models/shed.js');
  // console.log('shed is',Shed);

  app.post('/api/sheds',(req,res) => {
    console.log('request', req.data);
    var cb = (data) => {
      console.log('i saved a shed :', data);
      res.send(data);
    };

    var shed = new Shed();
    shed.name = req.body.name;
    shed.type = req.body.type;
    shed.year = req.body.year;
    shed.arch = req.body.arch;
    shed.location = req.body.location;
    // shed.location = req.body.location;
    // shed.location.street = req.body.street;
    // shed.location.city = req.body.city;
    // shed.location.country = req.body.country;
    shed.save(cb);
  });

//end of mongo test

app.use(express.static('public'));

var port = process.env.PORT || 5056;

app.listen(port, function(){
  console.log('listening to port',port);
})
