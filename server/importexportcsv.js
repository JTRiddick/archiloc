const express = require('express');
const mongotocsv = require('mongo-to-csv');

module.exports = {
  //api routes for exporting CSV should end up here
  // oh yeah maybe validate importing a csv too ha ha ha yeah

  getCSV:function(cmd) {
    var database;
    if(process.env.MONGODB_URI){
       database = 'heroku_6rlvg8wj';
    }else{
      //  database = 'arch-test';
      database = 'owls-api'; //when did i do this?
    }
    let options = {
      //change database to local or heroku maybe with env or start command
      // arch-test   or
      // heroku_6rlvg8wj
      database: database,
      collection: 'sites',
      fields: ['title','type','year','arch',
        'street','cityState','country','pic','description'],
      output: '/archilocatordata.csv',
      // allValidOptions: '-q'

    }
    mongotocsv.export(options,function(err,success){
      if (err){
        return err
      }else{
        return success;
      }

    })



  }

}
