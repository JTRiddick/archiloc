const express = require('express');
const mongotocsv = require('mongo-to-csv');

module.exports = function(passport){
  //api routes for exporting CSV should end up here
  // oh yeah maybe validate importing a csv too ha ha ha yeah

  let options = {
    //change database to local or heroku maybe with env or start command
    database: 'heroku_6rlvg8wj',
    collection: 'sites',
    fields: ['title','type','year','arch',
      'street','cityState','country','pic','description'],
    allValidOptions: '-q'

  }

  getCSV = (cmd) => {
    mongotocsv.export(options,function(err,success){
      console.log(err);
      console.log(success);
      return success;
    })
  }

}
