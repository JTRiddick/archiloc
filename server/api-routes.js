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

  router.delete('/api/sheds/:shedId/delete', (req,res) => {
    var cb = (err,data) => {
      console.log('delete cb ,',err,data);
      res.send(data);
    }
    console.log('delete params :', req.params);
    Shed.findByIdAndRemove(req.params.shedId,cb);
  });

  router.put('/api/sheds/:shedId/edit', (req,res) => {
    console.log('req params', req.params.shedId);
    var cb = (err,data) => {
      console.log('i updated a shed :',err,data);
      if (err){throw err};
      res.send(data);
    }
    console.log('edit req body',req.body);
    Shed.findByIdAndUpdate(req.params.shedId, {
      title: req.body.title,
      type: req.body.type,
      year: req.body.year,
      arch: req.body.arch,
      street: req.body.street,
      city: req.body.city,
      country: req.body.country
    },{safe:true,upsert:true,new:true,runValidators:false},cb)
  });

  router.get('/api/sheds/:shedId',(req,res) => {
    console.log('find req params', req.params.shedId);
    var cb = (err,data) => {
      console.log('i found something!');
      if (err){throw err};
      res.send(data);
    }
    Shed.findById(req.params.shedId)
    .exec((err,data)=>{
      console.log('data in get api to cb', data);
      cb(err,data);
    })
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
