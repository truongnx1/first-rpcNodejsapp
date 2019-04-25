	var express = require('express'),
	  app = express(),
	  port = process.env.PORT || 3000;
	  bodyParser = require('body-parser');

	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/mydb";
	MongoClient.connect(url, function(err, db) {
  		if (err) throw err;
  		console.log("Database created!");
  		db.close();
	});  
  // mongoose = require('mongoose'),
  // Task = require('./api/models/todoListModel'), //created model loading here
  // mongoose.Pronpmmise = global.Promise;
  // mongoose.Promise = global.Promise;
  // mongoose.connect('mongodb://localhost/Tododb'); 


	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());


	var routes = require('./api/routes/todoListRoutes'); //importing route
	routes(app); //register the route

	exports.MongoClient;
	exports.url;
	app.listen(port);

	console.log('todo list RESTful API server started on: ' + port);