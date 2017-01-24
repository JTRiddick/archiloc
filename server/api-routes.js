var express = require('express');
var Shed = require('./models/shed.js');

module.exports = function(){

  var router = express.Router();


  // console.log('shed is',Shed);

  router.post('/api/sheds',(req,res) => {
    console.log('request', req.data);
    var cb = (err,data) => {
      console.log('i saved a shed :', err, data);
      res.send(data);
    };
    console.log('req body', req.body);
    var shed = new Shed();
    shed.title = req.body.title;
    shed.type = req.body.type;
    shed.year = req.body.year;
    shed.arch = req.body.arch;
    shed.street = req.body.street;
    shed.city = req.body.city;
    shed.country = req.body.country;
    shed.save(cb);
  });

  router.delete('/api/sheds/:shedId', (req,res) => {
  
    console.log('delete params :', req.params);
    Shed.findByIdAndRemove(req.params.shedId);
  })


  router.get('/api/sheds',(req,res) => {
    Shed.find({
      //all of them?
    })
    .exec((err,data)=>{
      var shedArray = [];
      for (var key in data) {
        var shed = {
          id:data[key]._id,
          title: data[key].title,
          type:data[key].type,
          year:data[key].year,
          arch:data[key].arch,
          street:data[key].street,
          city:data[key].city,
          country:data[key].country
        };
        shedArray.push(shed);
      }
      res.send({
        sheds: shedArray
      });

    });
  });




  return router;
};
