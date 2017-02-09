var express = require('express');
var Site = require('./models/site.js');

module.exports = function(){

  var router = express.Router();


  // console.log('site is',Site);

  router.post('/api/sites',(req,res) => {
    console.log('request', req.data);
    var cb = (err,data) => {
      console.log('i saved a site :', err, data);
      res.send(data);
    };
    console.log('req body', req.body);
    var site = new Site();
    site.title = req.body.title;
    site.type = req.body.type;
    site.year = req.body.year;
    site.arch = req.body.arch;
    site.street = req.body.street;
    site.cityState = req.body.cityState;
    site.country = req.body.country
    site.pic = req.body.pic;
    site.description = req.body.description;
    site.styles.set(req.body.styles);
    site.save(cb);
  });
  //added new

  router.delete('/api/sites/:siteId/delete', (req,res) => {
    var cb = (err,data) => {
      console.log('delete cb ,',err,data);
      res.send(data);
    }
    console.log('delete params :', req.params);
    Site.findByIdAndRemove(req.params.siteId,cb);
  });

  router.put('/api/sites/:siteId/edit', (req,res) => {
    console.log('req params', req.params.siteId);
    var cb = (err,data) => {
      console.log('i updated a site :',err,data);
      if (err){throw err};
      res.send(data);
    }
    console.log('edit req body',req.body);
    Site.findByIdAndUpdate(req.params.siteId, {
      title: req.body.title,
      type: req.body.type,
      year: req.body.year,
      arch: req.body.arch,
      street: req.body.street,
      cityState: req.body.cityState,
      country:req.body.country,
      pic: req.body.pic,
      styles:req.body.styles,
      description:req.body.description,
    },{safe:false,upsert:true,new:true,runValidators:false},cb)
  });

  router.put('/api/sites/:siteId/tag', (req,res) => {
    console.log('tag api route req params', req.params);
    var cb = (err,data) => {
      console.log('i tagged a site :',err,data);
      res.send(data);
    }
    console.log('tag edit req body',req.body.styles,typeof(req.body.styles));
    Site.findByIdAndUpdate(req.params.siteId, {$push:{styles:req.body.styles}}
      ,{safe:true,upsert:true,runValidators:false},cb)
  });
  //^ Add style tag array to style[] property of object

  router.get('/api/sites/:siteId',(req,res) => {
    console.log('find req params', req.params.siteId);
    var cb = (err,data) => {
      console.log('i found something!');
      if (err){throw err};
      res.send(data);
    }
    Site.findById(req.params.siteId)
    .exec((err,data)=>{
      console.log('data in get api to cb', data);
      cb(err,data);
    })
  });

  router.get('/api/sites/:siteId/view-map',(req,res) => {
    //
    var cb = (err,data) => {
      console.log('i forund something!');
      if (err) throw err;
      res.send(data);
    }
    Site.findById(req.params.siteId)
    .exec((err,data)=>{
      //
      cb(err,data);
    })
  });

  router.get('/api/sites',(req,res) => {
    Site.find({
      //all of them?
    })
    .exec((err,data)=>{
      var siteArray = [];
      data.forEach((item) =>{
          site = {
            id:item._id,
            title: item.title,
            type:item.type,
            year:item.year,
            arch:item.arch,
            street:item.street,
            cityState:item.cityState,
            country:item.country,
            coordinate:item.coordinate,
            pic:item.pic,
            styles:item.styles,
            description:item.description,
            updated:item.updated
          };
        siteArray.push(site);
      })

      res.send({
        sites: siteArray
      });

    });
  });




  return router;
};
