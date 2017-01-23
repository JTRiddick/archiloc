var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var shedSchema = new Schema({
  title:{type: String, required: true, unique: true},
  type:{type: String},
  year:{type: String},
  arch:{type: String},
  street:{type: String, unique:true},
  city:{type: String},
  country:{type: String}
})
shedSchema.plugin(uniqueValidator);

var Shed = mongoose.model('Shed',shedSchema);
module.exports = Shed;
