var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var BlockCountSchema = new Schema({
  _count: Number
});

module.exports = mongoose.model('BlockCount', BlockCountSchema);
