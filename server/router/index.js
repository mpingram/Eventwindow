
module.exports=function(app){

	// TEST: trying to see if I can get this to work
	// outside of the index router file.

	app.use('/api', require('./routes/api.js'));

	// old code
	/*app.get('/api/events', function(req,res){
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
	*/

}