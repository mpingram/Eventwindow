
module.exports=function(app){

	app.use('/api/events*', require('./routes/api/events.js'));

};