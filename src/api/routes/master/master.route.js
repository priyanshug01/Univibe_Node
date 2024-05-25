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
    userLogin,
    forgotPassword,
    getUserDetails,
    favouriteAdd,
    getFavouriteList,
    getActiveEventList,
    getUpcomingEventList,
    bookingAdd,
    reviewAdd,
    reviewView,
    getUserById,
    eventAdd,
    favAdd,
    getfavview,

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
router.post('/api/v1/master/userLogin', catchErrors(userLogin));
router.post('/api/v1/master/forgotPassword', catchErrors(forgotPassword));
router.post('/api/v1/master/getUserDetails', catchErrors(getUserDetails));
router.post('/api/v1/master/favouriteAdd', catchErrors(favouriteAdd));
router.post('/api/v1/master/getFavouriteList', catchErrors(getFavouriteList));
router.post('/api/v1/master/getActiveEventList', catchErrors(getActiveEventList));
router.post('/api/v1/master/getUpcomingEventList', catchErrors(getUpcomingEventList));
router.post('/api/v1/master/bookingAdd', catchErrors(bookingAdd));
router.post('/api/v1/master/reviewAdd', catchErrors(reviewAdd));
router.post('/api/v1/master/reviewView', catchErrors(reviewView));
router.post('/api/v1/master/getUserById', catchErrors(getUserById));
router.post('/api/v1/master/eventAdd', catchErrors(eventAdd));
router.post('/api/v1/master/favAdd', catchErrors(favAdd));
router.post('/api/v1/master/getfavview', catchErrors(getfavview));