var express=require('express');
var router=express.Router();
var moment = require('moment');
var db = require('../../database');
var Events = db.Events;

router.get('/?:content', function(req,res) {

    var upcomingEvents = [{
    	'name':'Foo',
    	'organizer':'Bar'
    },
    {
    	'name':'Baz',
    	'organizer':'Sprong'
    }];
    
    res.send('it worked');

    res.status(200).json([
        JSON.stringify(upcomingEvents)
    ]);


});

module.exports=router;