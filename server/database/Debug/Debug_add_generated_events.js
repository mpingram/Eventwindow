// batch-add-events.js
var MongoClient = require("mongodb").MongoClient;
//var ObjectID = require("mongodb").ObjectID;
var url = "mongodb://localhost/test";

var EventGenerator = require("./event_generator");

// executing event generator 
var genStart = new Date("Thu, 01 May 2016 09:00:00 CDT");
var genEnd = new Date("Thu, 01 Aug 2016 15:00:00 CDT");
var eventGen = new EventGenerator();
var batch = eventGen.run(genStart, genEnd);

MongoClient.connect(url, function(err, db){
	if (err) {
		console.log(err);
	}
	console.log("connected to server...");
	db.collection("events").insert(batch, function(err, result){
		if (err){
			console.log(err);
		}
		console.log("batch inserted successfully dork. Uhh take a look\n\n\n" + result);
	});
	
});
 