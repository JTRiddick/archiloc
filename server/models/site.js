var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var siteSchema = new Schema({
  title:{type: String, required: true, unique: true},
  type:{type: String},
  year:{type: String},
  arch:{type: String},
  styles:[],
  street:{type: String, required:true, unique:true},
  cityState:{type: String, required:true},
  country:{type:String, required:true},
  coordinate:{
    lat:{type: Number},
    long:{type: Number}
  },
 pic:{type:String},
 updated: { type: Date, default: Date.now }

})
siteSchema.plugin(uniqueValidator);

var Site = mongoose.model('Site',siteSchema);
module.exports = Site;
