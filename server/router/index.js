

/**
 * Index of all routes
 */

module.exports = function (app) {

    app.use('/signup', require('./routes/signup'));
    app.use('/api', require('./routes/api'));
};