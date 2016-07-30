var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var routes = require('./router/index');

var app = express();

app.use(favicon(path.join(__dirname,'dist','favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


/**
 * Development Settings
 */

if (app.get('env') === 'development') {
	// This will change in production since we'll be using the dist folder
	// This covers serving up the index page
	app.use(express.static(path.join(__dirname, '../client')));
	app.use(express.static(path.join(__dirname, '../client/app')));
    app.use(express.static(path.join(__dirname, '../client/.tmp')));

	// Error Handling
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

/**
 * Production Settings
 */
if (app.get('env') === 'production') {

	// changes it to use the optimized version for production
	app.use(express.static(path.join(__dirname, '/dist')));

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});
}


/**
 * Routes
 */
var router=require('./router')(app);


console.log("App running in " +  app.settings.env + " mode...");
module.exports = app;