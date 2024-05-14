'use strict';

// local imports
const homeRoutes = require('./home.route');
const masterRoutes = require('./master/master.route');


// configure all routes
module.exports = (app) => {
    app.use(homeRoutes);
    app.use(masterRoutes);
}