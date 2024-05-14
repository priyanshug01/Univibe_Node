'use strict';

// global imports
const HttpStatus = require('http-status-codes');
const { validationResult } = require('express-validator/check');
// local imports
const env = require('../../env');

/**
 * Catch Errors Handler
 * 
 * With async/await, you need some way to catch errors.
 * Instead of using try{} catch(e) {} in each controller, we wrap the function in
 * catchErrors(), catch and errors they throw, and pass it along to our express middleware with next()
 */
exports.catchErrors = (fn) => {
    return function (req, res, next) {
        return fn(req, res, next).catch(next);
    };
};


/**
 * Global Error Handler
 * 
 * In development, we show good error messages so if we hit a syntax error or any other previously un-handled error, we can show good info on what happened
 * In production, No stacktraces are leaked to client
 */
exports.globalErrors = (err, req, res, next) => {
    console.log('\nErrorHandlerMiddleware.globalErrors triggered -->');

    const { isDevelopment, isErrorStackTrace_ON } = env.env;
    // const { method, url, body } = req;
    // console.log(`method: ${method}, url: ${url}, body: ${body}`);

    const { statusCode, code, name, message, stack, errors } = err;

    res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    const responseObject = {
        status: 0,
        name,
        message,
        data: {
            errors: []
        },
    };

    // // Catch Mongoose Schema Validation Errors
    // if (name && name === 'ValidationError') {
    //     responseObject.message = `Mongoose Schema Validaton Error has occured. Check 'errors' field for more details!`;

    //     if (typeof errors === 'object') {
    //         Object.keys(errors).forEach((errorKey) => {
    //             responseObject.data.errors.push({
    //                 field: errorKey,
    //                 message: errors[errorKey].message,
    //             });
    //         });
    //     }
    // }

    if (isDevelopment || isErrorStackTrace_ON) {
        // Development Error Handler - Prints stack trace
        let stackTrace = stack || '';

        responseObject.statusCode = statusCode;
        responseObject.code = code;
        responseObject.stack = stackTrace.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>');

        // send final response
        /* return res.format({
            json: () => res.json(responseObject), // default accept type
            html: () => res.render('error', responseObject)
        }); */

        console.log(responseObject);
        // send final response
        return res.json(responseObject);
    } else {
        // Production Error Handler - No stack traces

        // send final response
        /* return res.format({
            json: () => res.json(responseObject), // default accept type
            html: () => res.render('error', responseObject)
        }); */

        console.log(responseObject);
        // send final response
        return res.json(responseObject);
    }
};