const express = require('express');
const mongotocsv = require('mongo-to-csv');

module.exports = function(passport){
  //api routes for exporting CSV should end up here
  // oh yeah maybe validate importing a csv too ha ha ha yeah

  const getCSV = () => {
    if(process.env.MONGODB_URI){
      const database = 'heroku_6rlvg8wj';
    }else{
      const database = 'arch-test';
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
      allValidOptions: '-q'

    }

    getCSV = (cmd) => {
      mongotocsv.export(options,function(err,success){
        if (err){
          return err
        }
        return success;
      })
    }


  }


  return getCSV;
}
