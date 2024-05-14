'use strict';

// global imports
const express = require('express');
// local imports
const env = require('../../../env');
const {
    getStateMaster,
    getCityMaster,
    getCollegeMaster,
    getRoleMaster,
    getDepartmentMaster,
    getEventMaster,
    userAdd,
    getUserDetails,
    favouriteAdd,
    getFavouriteList,
    getEventList,
    bookingAdd,

} = require('../../controllers').MasterController;

const { catchErrors } = require('../../middlewares').ErrorHandlerMiddleware;
const router = express.Router();
//const { v1 } = env.routes.user;

module.exports = router;

/*******************************
 * Master Model APIs v1 *
 *******************************/

router.post('/api/v1/master/getStateMaster', catchErrors(getStateMaster));
router.post('/api/v1/master/getCityMaster', catchErrors(getCityMaster));
router.post('/api/v1/master/getCollegeMaster', catchErrors(getCollegeMaster));
router.post('/api/v1/master/getRoleMaster', catchErrors(getRoleMaster));
router.post('/api/v1/master/getDepartmentMaster', catchErrors(getDepartmentMaster));
router.post('/api/v1/master/getEventMaster', catchErrors(getEventMaster));
router.post('/api/v1/master/userAdd', catchErrors(userAdd));
router.post('/api/v1/master/getUserDetails', catchErrors(getUserDetails));
router.post('/api/v1/master/favouriteAdd', catchErrors(favouriteAdd));
router.post('/api/v1/master/getFavouriteList', catchErrors(getFavouriteList));
router.post('/api/v1/master/getEventList', catchErrors(getEventList));
router.post('/api/v1/master/bookingAdd', catchErrors(bookingAdd));