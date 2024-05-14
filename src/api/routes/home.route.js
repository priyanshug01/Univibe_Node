'use strict';

// global imports
const express = require('express');
// local imports
const env = require('../../env');

const router = express.Router();

module.exports = router;

// home route
router.get('/', (req, res, next) => {
    res.send(`<div>
                <center>
                    <h2>Welcome @ ${env.app.name}</h2>
                    <h3>Node Connected Successfully.</a></h3>
                </center>
            </div>`
    );
});