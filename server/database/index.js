/**
 * Our Database Interface
 */
var mongoose = require('mongoose');
var UserModel = require('./schemas/users');
var EventsModel = require('./schemas/events');

// Connections
var developmentDb = 'mongodb://localhost/test';
var productionDb = 'urlToYourProductionMongoDb'; // REPLACE WITH REAL DEAL URL WHEN THAT APPLIES
var usedDb;

// If we're in development...
if (process.env.NODE_ENV === 'development') {
    // set our database to the development one
    usedDb = developmentDb;
    // connect to it via mongoose
    mongoose.connect(usedDb);
}

// If we're in production...
if (process.env.NODE_ENV === 'production') {
    // set our database to the development one
    usedDb = productionDb;
    // connect to it via mongoose
    mongoose.connect(usedDb);
}

// get an instance of our connection to our database
var db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));

// Open the connection
db.once('open', function callback () {
  console.log('Database connection successfully opened at ' + usedDb);
});

exports.users = UserModel;
exports.Events = EventsModel;