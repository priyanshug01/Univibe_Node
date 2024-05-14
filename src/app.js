'use strict';

// global imports
const addRequestId = require('express-request-id'); // add id to request headers
const bodyParser = require('body-parser'); // parse user requests
const compression = require('compression'); // gzip user responses
const express = require('express');
const cors = require('cors');
// const expressSession = require('express-session'); // user session management
// const mongoose = require('mongoose');
// const MongoStore = require('connect-mongo')(expressSession); // store user session
const helmet = require('helmet'); // secure user response headers
const morgan = require('morgan'); // log request routes
const os = require('os');
const path = require('path');
// const passport = require('passport'); // user password management
const swaggerUi = require('swagger-ui-express'); // document app routes
// local imports
const env = require('./env');
const { globalErrors } = require('./api/middlewares').ErrorHandlerMiddleware;
//const { trackRequest } = require('./api/middlewares').RequestHandlerMiddleware;
//const swaggerDocument = require('./doc/swagger/app.swagger');
// const openapiDocument = require('./doc/openapi.json');
const { getModels } = require('./api/models'); // load all models

// Make sure we are running node 7.6+
/* const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 7 || (major === 7 && minor <= 5)) {
  console.log('🛑 🌮 🐶 💪 💩\nHey You! \n\t ya you! \n\t\tBuster! \n\tYou\'re on an older version of node that doesn\'t support the latest and greatest things we are learning (Async + Await)! Please go to nodejs.org and download version 7.6 or greater. 👌\n ');
  process.exit();
} */

// create express application
const app = express();

/**
 * settings
 */
app.set('host', env.app.host);
app.set('port', env.app.port);
app.use(cors());
/**
 * middlewares
 */
/* initial:before middlewares */

/* initial middlewares */
app.use(compression());
app.use(addRequestId());
//app.use(trackRequest());
app.use(helmet());
app.use(morgan('dev'));

// no cors set up till now

/* session middlewares */
/* const sessionConfig = {
    resave: env.session.resave,
    saveUninitialized: env.session.saveUninitialized,
    secret: env.session.secret,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: env.session.storeTTL,
    })
}; */
// app.use(expressSession(sessionConfig)); // try redis in future for session management
// app.use(passport.initialize());
// app.use(passport.session());

/* auth middlewares */

/* explorer [swagger 2.0, openapi 3.0.0] */
// if (env.env.isDevelopment || env.env.isSwaggerUI_ON) {
//     app.use('/doc/swagger', (req, res) => res.json(swaggerDocument));
//     app.use('/explorer/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//     // app.use('/explorer/openapi', swaggerUi.serve, swaggerUi.setup(openapiDocument));
// }

/* parse middlewares */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* route middlewares */
require('./api/routes')(app);

/* file middlewares */
app.use('/doc', express.static(path.join(__dirname, 'doc')));

/* images folder access */
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

/* final middlewares */
//app.use(routeNotFound);

/* final:after middlewares */
app.use(globalErrors);

/* app objects */
// console.log('app: ', app);
// console.log('app cache: ', app.cache);
// console.log('app engines: ', app.engines);
// console.log('app settings: ', app.settings);
// console.log('app _router: ', app._router);
// console.log('app _router stack: ', app._router.stack);

/* view all registered routes */
/* let route, routes = [];
app._router.stack.forEach((middleware) => {
    if (middleware.route) {  // routes registered directly on the app
        route = middleware.route;
        route && routes.push({ method: route.stack[0].method, path: route.path });
    } else if (middleware.name === 'router') { // router middleware
        middleware.handle.stack.forEach((handler) => {
            route = handler.route;
            route && routes.push({ method: route.stack[0].method, path: route.path });
        });
    }
});
console.log('\nRegistered Routes -->\n', routes); */
// console.table(routes);

// create http server
const server = app.listen(app.get('port'), app.get('host'), async (err) => {
    // error
    if (err) {
        console.log('\nApp crashed with errors! 👎👎👎👎👎👎👎👎');
        console.error(`\n🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → \n${JSON.stringify(err, 0, 2)}`);
    } else {
        await getModels();
        if (app.get('host')) {
            const baseUrl = `http://${app.get('host')}:${server.address().port}/`;
            console.log(`\nExpress server listening at → URL ${baseUrl} in ${app.get('env')} mode.`);
        } else {
            const baseUrl = `http://${os.hostname()}:${server.address().port}/`;
            console.log(`\nExpress server listening at → URL ${baseUrl} in ${app.get('env')} mode.`);
        }
        console.log('\nApp started successfully! 👍👍👍👍👍👍👍👍');
    }
});

/**
 * exports
 */
module.exports = app;