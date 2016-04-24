var express=require('express');
var moment = require('moment');
var db = require('../database');
var Events = db.Events;



module.exports=function(app){
	app.get('/api/events', function(req,res){
	var upcomingEvents = [{
		'name':'Foo',
		'organizer':'Bar'
		},
		{
		'name':'Baz',
		'organizer':'Sprong'
	}];

    res.status(200).json([
        JSON.stringify(upcomingEvents)
    	]);
	});
}