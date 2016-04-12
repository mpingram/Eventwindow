var express=require('express');
var router=express.Router();

//var db = require('../../database');
//var Events = require(db.events);

router.get('/', function(req,res) {
    res.status(200).json([
        {
            name:'foo',
            test:10
        },
        {
            name:'bar',
            test:10
        }
    ]);
});

module.exports=router;