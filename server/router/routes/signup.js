var express=require('express');
var router=express.Router();
var moment = require('moment');
var _ = require('underscore');
var color = require('cli-color');
var db = require('../../database');
var Users = db.users;

// POST /signup route
router.post('/', function (req,res) {
    
    // posted information from angular
    var body = req.body;
    // log time
    var time = moment().format('MMMM Do YYYY, h:mm:ss a');
    
    // check to see if user is already real
    // using their email
    Users.findOne({
        
        'email': body.email
        
    }, function (err, user) {
        
        // if error, log and return to user
        if (err) {
            
            // nice log message
            console.log("Couldn't create a new user at " + color.red(time) + "by " + color.blue(body.email) + "because of: " + color.red(err));
            
            // send the error
            res.status(500).json({
                'message': 'Internal server error from signing up new user. Please contact someone who gives a fuck.'
            });
        }
    
        // if the user doesn't already real, create one
        if (!user) {
            console.log('creating a new user at ' + color.green(time) +  ' with the email: ' + color.green(body.email));

            // set up the new user
            var newUser = new Users({
                firstname: body.firstname,
                lastname: body.lastname,
                email: body.email,
                password: body.password1
            });

            // save the user to the database
            newUser.save(function (err, savedUser, numberAffected) {

                if (err) {
                    console.log("Problem saving the user " + color.yellow(body.email) + "due to this bullshit: " + err);
                    res.status(500).json({
                        'message': 'database error trying to sign up. We fucked up lol sry.'
                    });
                }

                // log success & send filtered user back
                console.log("Hs it worked\nWelcome to the world, " + color.green(body.email));

                res.status(201).json({
                    'message': 'successfully created a literal person',
                    'client': _.omit(savedUser,'password')
                });
            });
        }

        // if user already exists...
        if (user) {
            res.status(409).json({
                'message': "well this is awkward. user already exists at " + color.red(body.email) + ".\n\n\n\n\t.....are you lying to me?"
            });
        }
    });
});

// export router for use in whatever
// he means server/router/index.js
module.exports = router;