var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});














// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;


// var BlockCountSchema = new Schema({
//   _count: Number
// });

// var BlockSchema = new Schema({
// });

// module.exports = mongoose.model('BlockCount', BlockCountSchema);
// module.exports = mongoose.model('Block', BlockSchema);
