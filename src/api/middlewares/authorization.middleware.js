'use strict';

// global imports
const HttpStatus = require('http-status-codes');
// const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

// local imports
const { getModels } = require('../models');


const jwtSecretKey = '123##$$)(***&';

// authentication and authorization
exports.authorize = () => {
    return [
        // authenticate JWT token and attach user to request object (req.user)
        expressJwt({ secret: jwtSecretKey }),
        // role based access control not required
        async (req, res, next) => {
            let password = null;
            const { UserMaster, Login, db1Conn } = await getModels();
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
                password = req.headers.authorization.split(' ')[1];

            console.log('\nAuthorizationMiddleware.authorize triggered -->');

            console.log('req.user=== ', req.user);
            console.log('password ===', password); // accress_token

            const authUser = await Login.findOne({ where: { password } });
            // if (authUser && authUser.user_id == req.user.id){

            // }else {

            // }


            const temp_user_id = req.body.user_id || req.params.user_id;

            if (temp_user_id) {
                // authentication successful
                if (temp_user_id == req.user.id) {
                    const authUser = await Login.findOne({ where: { user_id: temp_user_id, password: password } });

                    console.log("\n\n AUTHUSER======", JSON.stringify(authUser, 0, 2));
                    if (authUser) {
                        console.log('SUCCESS-------------111');
                        next();
                    }
                    else {

                        const responseObject = {
                            status: 0,
                            message: 'Not authorised user, AccessToken not correct',
                            data: {}
                        };
                        console.log('HttpStatus.FORBIDDEN ===', HttpStatus.FORBIDDEN);
                        console.log('responseObject ===', responseObject);
                        return res.status(HttpStatus.FORBIDDEN).send(responseObject);
                    }
                }
                else {
                    const responseObject = {
                        status: 0,
                        message: 'Not authorised user, incorrect user_id',
                        data: {}
                    };
                    console.log('HttpStatus.FORBIDDEN ===', HttpStatus.FORBIDDEN);
                    console.log('responseObject ===', responseObject);
                    return res.status(HttpStatus.FORBIDDEN).send(responseObject);
                }
            }
            else {
                const responseObject = {
                    status: 0,
                    message: 'Not Authorised User',
                    data: {}
                };
                console.log('HttpStatus.FORBIDDEN ===', HttpStatus.FORBIDDEN);
                console.log('responseObject ===', responseObject);
                return res.status(HttpStatus.FORBIDDEN).send(responseObject);
            }


        }
    ];
}



// only authentication, no authorization
exports.authenticate = () => {
    return [
        // authenticate JWT token and attach user to request object (req.user)
        expressJwt({ secret: jwtSecretKey }),
        async (req, res, next) => {
            validate(req, res, next)
        }
    ];
}


function validate(req, res, next) {
    let password = null;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
        password = req.headers.authorization.split(' ')[1];

    console.log('\nAuthorizationMiddleware.authenticate triggered -->');
    console.log('req.user ', req.user);
    console.log('password ', password);
    // authentication successful

    next();
}