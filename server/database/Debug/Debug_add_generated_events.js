// batch-add-events.js
var MongoClient = require("mongodb").MongoClient;
var moment = require("moment");
//var ObjectID = require("mongodb").ObjectID;
var url = "mongodb://localhost/test";

var EventGenerator = require("./event_generator");

// executing event generator 
var genStart = moment("2016-05-01", "YYYY-MM-DD");
var genEnd = moment("2016-08-01", "YYYY-MM-DD");
var eventGen = new EventGenerator();
var events = eventGen.run(genStart, genEnd);

MongoClient.connect(url, function(err, db){
	if (err) {
		console.log(err);
	}
	console.log("connected to server...");
	db.collection("foo").insert(events, function(err, result){
		if (err){
			console.log(err);
		}
		console.log("batch inserted successfully dork.");
	});
	
});
 