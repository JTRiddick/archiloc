var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var siteSchema = new Schema({
  title:{type: String, required: true, unique: true},
  type:{type: String},
  year:{type: String},
  arch:{type: String},
  styles:[],
  address:{
    street:{type: String, unique:true},
    cityState:{type: String},
    country:{type: String}
  },
  coordinate:{
    lat:{type: Number},
    long:{type: Number}
  },
 imagelink:{type:String},
 updated: { type: Date, default: Date.now }

})
siteSchema.plugin(uniqueValidator);

var Site = mongoose.model('Site',siteSchema);
module.exports = Site;
