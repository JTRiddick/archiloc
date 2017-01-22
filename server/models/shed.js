var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shedSchema = new Schema({
  title:String,
  type:String,
  year:String,
  arch:String,
  location:{
    street: String,
    city: String,
    country: String
  }
})

var Shed = mongoose.model('Shed',shedSchema);
module.exports = Shed;
