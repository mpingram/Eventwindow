/**
 * Index of all routes
 */

module.exports = function (app) {

    // The signup route
    app.use('/signup', require('./routes/signup'));
};