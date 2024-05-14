/** 
* This folder contains all env variables.
*/
'use strict';

// global imports
const path = require('path');
const dotenv = require('dotenv');
// local imports
const pkg = require('../package.json');
const { getOsEnv, getOsEnvOptional, normalizePort, toBool, toNumber } = require('./lib').EnvLib;

/**
 * Load .env file, then for local, var.local.env file etc.
 */
dotenv.config({ path: path.join(process.cwd(), `.env`) });
dotenv.config({ path: path.join(process.cwd(), `/env/var.${process.env.NODE_ENV}.env`) });

/**
 * Environment variables
 */
// env config
exports.env = {
    node: process.env.NODE_ENV || 'development', // [ 'local', 'development', 'test', 'production' ]
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    isDevelopment: process.env.NODE_ENV === 'development',
    isLocal: process.env.NODE_ENV === 'local',
    isSwaggerUI_ON: getOsEnv('SWAGGER_UI') === 'ON', // [ 'ON', 'OFF' ]
    isErrorStackTrace_ON: getOsEnv('ERROR_STACK_TRACE') === 'ON', // [ 'ON', 'OFF' ]
    isMysqlDebugMode_ON: getOsEnv('MYSQL_DEBUG_MODE') === 'ON', // [ 'ON', 'OFF' ]
    utcOffsetMins: 330, // INDIA - +05:30
};

// app config
exports.app = {
    name: getOsEnv('APP_NAME'),
    version: pkg.version,
    description: pkg.description,
    schema: getOsEnv('APP_SCHEMA'), // [ 'http', 'https', 'http2' ]
    host: getOsEnvOptional('APP_HOST'), // ['0.0.0.0/127.0.0.1/localhost', 'rama-vostro-1540', 'PROXY']
    port: normalizePort(process.env.PORT || getOsEnv('APP_PORT')),
    routePrefix: getOsEnv('APP_ROUTE_PREFIX'), // '/api'
};

// mysql config
exports.mysql = {
    URI: getOsEnv('MYSQL_URI'), // 'mysql://username:password@localhost:27017/database'
    URI2: getOsEnv('MYSQL_URI_2'),
};

// sms config
exports.sms = {
    URI: getOsEnv('SMS_API_URI'),
    otpLoginExpTime: 15, // in minutes
};


// paytm details
exports.paytm = {
    mid: 'RXQJae28181576741792',
    mkey: 'pDpQHeFnRmqjzfQ3'
};

// Image path details
exports.img = {
    img_url: 'https://iestre.s3.ap-south-1.amazonaws.com/'
};