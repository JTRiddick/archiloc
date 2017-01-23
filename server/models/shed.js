var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shedSchema = new Schema({
  title:{type: String},
  type:{type: String},
  year:{type: String},
  arch:{type: String},
  street:{type: String},
  city:{type: String},
  country:{type: String}
})

var Shed = mongoose.model('Shed',shedSchema);
module.exports = Shed;
