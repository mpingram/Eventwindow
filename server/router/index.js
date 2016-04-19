

/**
 * Index of all routes
 */

module.exports = function (app) {

    app.use('/signup', require('./routes/signup'));
    app.use('/dash-events-upcoming.json', require('./routes/dash-event-data'));
};