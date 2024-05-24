const { getModels } = require('../../models');
const moment = require('moment');
const { Op } = require('sequelize');

const multer = require('multer');
const path = require('path');

// multer file save
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');
    },
    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, 'img_' + Date.now() + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif)$/)) {
        req.fileValidationError = 'File Format not correct! Not suppoted.';
        return cb(new Error('File Format not correct! Not suppoted.'), false);
    }
    cb(null, true);
};

const pdfFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|pdf)$/)) {
        req.fileValidationError = 'File Format not correct! Not suppoted.';
        return cb(new Error('File Format not correct! Not suppoted.'), false);
    }
    cb(null, true);
};


/* ************ Get State Master List ************ */
exports.getStateMaster = async (req, res) => {
    console.log('\nMasterController.getStateMaster triggered -->');
    const { state_master, db1Conn } = await getModels();
    console.log(`\n req.body: `, req.body);
    try {
        let list = await state_master.findAll({
            order: [['state_id', 'ASC']],
            where: { status: 1 },
            attributes: ['state_id', 'state_name'],
        });

        if (list) {
            res.json({ status: 1, message: "State List Found", data: list });
        } else {
            res.json({ status: 0, message: "State List not Found!", data: {} });
        }
    }
    catch (error) {
        console.log('\nMasterController.getStateMaster error', error)
        //res.json({ status: 0, message: "error", data: JSON.stringify(error, 0, 2) });
        throw error;
    }
}

/* ************ Get City Master List ************ */
exports.getCityMaster = async (req, res) => {
    console.log('\nMasterController.getCityMaster triggered -->');
    const { city_master, state_master, db1Conn } = await getModels();
    console.log(`\n req.body: `, req.body);
    try {
        let list = await city_master.findAll({
            order: [['city_id', 'ASC']],
            where: { status: 1 },
            attributes: ['city_id', 'city_name'],

            include: [{
                model: state_master,
                attributes: ['state_id', 'state_name']
            }]
        });

        if (list) {
            res.json({ status: 1, message: "City List Found", data: list });
        } else {
            res.json({ status: 0, message: "City List not Found!", data: {} });
        }
    }
    catch (error) {
        console.log('\nMasterController.getCityMaster error', error)
        throw error;
    }
}

/* ************ Get College Master List ************ */
exports.getCollegeMaster = async (req, res) => {
    console.log('\nMasterController.getCollegeMaster triggered -->');
    const { city_master, state_master, college_master, db1Conn } = await getModels();
    console.log(`\n req.body: `, req.body);
    try {
        let list = await college_master.findAll({
            order: [['college_id', 'ASC']],
            where: { status: 1 },
            attributes: ['college_id', 'college_name'],

            include: [{
                model: state_master,
                attributes: ['state_id', 'state_name']
            }, {
                model: city_master,
                attributes: ['city_id', 'city_name']
            },]
        });

        if (list) {
            res.json({ status: 1, message: "College List Found", data: list });
        } else {
            res.json({ status: 0, message: "College List not Found!", data: {} });
        }
    }
    catch (error) {
        console.log('\nMasterController.getCollegeMaster error', error)
        throw error;
    }
}

/* ************ Get Role Master List ************ */
exports.getRoleMaster = async (req, res) => {
    console.log('\nMasterController.getRoleMaster triggered -->');
    const { role_master, db1Conn } = await getModels();
    console.log(`\n req.body: `, req.body);
    try {
        let list = await role_master.findAll({
            order: [['role_id', 'ASC']],
            where: { status: 1 },
            attributes: ['role_id', 'role_type'],

        });

        if (list) {
            res.json({ status: 1, message: "Role List Found", data: list });
        } else {
            res.json({ status: 0, message: "Role List not Found!", data: {} });
        }
    }
    catch (error) {
        console.log('\nMasterController.getRoleMaster error', error)
        throw error;
    }
}

/* ************ Get Department Master List ************ */
exports.getDepartmentMaster = async (req, res) => {
    console.log('\nMasterController.getDepartmentMaster triggered -->');
    const { department_master, db1Conn } = await getModels();
    console.log(`\n req.body: `, req.body);
    try {
        let list = await department_master.findAll({
            order: [['department_id', 'ASC']],
            where: { status: 1 },
            attributes: ['department_id', 'department_code', 'department_name'],

        });

        if (list) {
            res.json({ status: 1, message: "Department List Found", data: list });
        } else {
            res.json({ status: 0, message: "Department List not Found!", data: {} });
        }
    }
    catch (error) {
        console.log('\nMasterController.getDepartmentMaster error', error)
        throw error;
    }
}
/* ************ Get Event Master List ************ */
exports.getEventMaster = async (req, res) => {
    console.log('\nMasterController.getEventMaster triggered -->');
    const { event_master, db1Conn } = await getModels();
    console.log(`\n req.body: `, req.body);
    try {
        let list = await event_master.findAll({
            order: [['event_start_date', 'ASC']],
            where: { status: 1 },
            attributes: ['event_id', 'event_name'],
        });

        if (list) {
            res.json({ status: 1, message: "Event List Found", data: list });
        } else {
            res.json({ status: 0, message: "Event List not Found!", data: {} });
        }
    }
    catch (error) {
        console.log('\nMasterController.getEventMaster error', error)
        throw error;
    }
}
/* ************ User Add ************ */
exports.userAdd = async (req, res) => {
    console.log('\nMasterController.userAdd triggered -->');

    const { user_master, db1Conn } = await getModels();
    var today_date = moment(new Date()).format("YYYY/MM/DD");

    try {
        let list = await user_master.findAll({
            where: {
                user_email: req.body.user_email,
                // user_contact: req.body.user_contact,
            },
        });
        if (list == 0 || list == []) {
            await user_master.create({
                role_id: 5,
                college_id: req.body.college_id,
                department_id: req.body.department_id,
                user_name: req.body.user_name,
                user_email: req.body.user_email,
                user_password: req.body.user_password,
                user_contact: '',
                status: 1,
            });
            res.json({ status: 1, message: "User Added Successfully.", data: {} });
        }
        else {
            res.json({ status: 0, message: "User Already Exists.", data: {} });
        }
    }
    catch (error) {
        console.log('\nMasterController.userAdd error', error)
        throw error;
    }
}
/* ************ User Login ************ */
exports.userLogin = async (req, res) => {
    console.log('\nMasterController.userLogin triggered -->');

    const { user_master, db1Conn } = await getModels();

    try {
        let list = await user_master.findOne({
            where: {
                user_email: req.body.user_email,
                user_password: req.body.user_password,
            },
        });
        if (list == 0 || list == [] || list == null) {
            res.json({ status: 0, message: "User Doesn't Exists.", data: {} });
        } else {
            res.json({ status: 1, message: "User Login Successful!", data: [list] });
        }
    }
    catch (error) {
        console.log('\nMasterController.userLogin error', error)
        throw error;
    }
}
/* ************ Forgot Password ************ */
exports.forgotPassword = async (req, res) => {
    console.log('\nMasterController.forgotPassword triggered -->');

    const { user_master, db1Conn } = await getModels();

    try {
        let list = await user_master.findOne({
            where: {
                user_email: req.body.user_email,
            },
        });
        if (list == 0 || list == []) {
            res.json({ status: 0, message: "User Doesn't Exists.", data: {} });
        } else {
            res.json({ status: 1, message: "User Login Successful!", data: [list] });
        }
    }
    catch (error) {
        console.log('\nMasterController.forgotPassword error', error)
        throw error;
    }
}
/* ************ User Details ************ */
exports.getUserDetails = async (req, res) => {
    console.log('\nMasterController.getUserDetails triggered -->');

    const { user_master, db1Conn } = await getModels();

    try {
        let list = await user_master.findAll({
            where: {
                user_email: req.body.user_email,
                user_password: req.body.user_password,
            },
        });

        if (list == 0 || list == []) {
            res.json({ status: 0, message: "No Such User Exists.", data: {} });
        }
        else {
            res.json({ status: 1, message: "User Found Successfully.", data: { list } });

        }
    }
    catch (error) {
        console.log('\nMasterController.getUserDetails error', error)
        throw error;
    }
}
/* ************ User Add ************ */
exports.favouriteAdd = async (req, res) => {
    console.log('\nMasterController.favouriteAdd triggered -->');

    const { favourite_master, db1Conn } = await getModels();
    var today_date = moment(new Date()).format("YYYY/MM/DD");
    var favourite = req.body.favourite;

    try {
        if (favourite == 0) {
            await favourite_master.create({
                event_id: req.body.event_id,
                user_id: req.body.user_id,
                status: 1,
                event_date: req.body.event_date,
            });
            res.json({ status: 1, message: "Favourite Added Successfully.", data: {} });
        } else {
            await favourite_master.update({
                status: 0,
                where: { favourite_id: req.body.favourite_id },
            });
            res.json({ status: 1, message: "Favourite Removed Successfully.", data: {} });
        }
    }
    catch (error) {
        console.log('\nMasterController.favouriteAdd error', error)
        throw error;
    }
}
/* ************ User Details ************ */
exports.getFavouriteList = async (req, res) => {
    console.log('\nMasterController.getFavouriteList triggered -->');

    const { favourite_master, event_master, db1Conn } = await getModels();

    try {
        let list = await favourite_master.findAll({
            include: [{
                model: event_master,
            }],
            where: {
                status: 1,
                event_date: { [Op.lt]: today_date },
            },
        });

        if (list == 0 || list == []) {
            res.json({ status: 0, message: "No Such Favourite List Exists.", data: {} });
        }
        else {
            res.json({ status: 1, message: "Favourite List Found Successfully.", data: { list } });

        }
    }
    catch (error) {
        console.log('\nMasterController.getFavouriteList error', error)
        throw error;
    }
}
/* ************ Get Active Event List ************ */
exports.getActiveEventList = async (req, res) => {
    console.log('\nMasterController.getActiveEventList triggered -->');
    const { event_master, college_master, city_master, state_master, db1Conn } = await getModels();
    console.log(`\n req.body: `, req.body);
    var today_date = moment(new Date()).format("YYYY/MM/DD");

    try {
        let list = await event_master.findAll({
            order: [['registration_start_date', 'ASC']],
            where: { status: 1 },
            attributes: ['event_id', 'event_name', 'event_fees', 'event_type'],

            include: [{
                model: college_master,
                attributes: ['college_id', 'college_name'],

                include: [{
                    model: state_master,
                    attributes: ['state_id', 'state_name']
                }, {
                    model: city_master,
                    attributes: ['city_id', 'city_name']
                },]
            }]
        });

        if (list) {
            res.json({ status: 1, message: "Active Event List Found", data: list });
        } else {
            res.json({ status: 0, message: "Active Event List not Found!", data: {} });
        }
    }
    catch (error) {
        console.log('\nMasterController.getActiveEventList error', error)
        throw error;
    }
}
/* ************ Get Upcoming Event List ************ */
exports.getUpcomingEventList = async (req, res) => {
    console.log('\nMasterController.getUpcomingEventList triggered -->');
    const { event_master, college_master, city_master, state_master, db1Conn } = await getModels();
    console.log(`\n req.body: `, req.body);
    var today_date = moment(new Date()).format("YYYY/MM/DD");

    try {
        let list = await event_master.findAll({
            order: [['registration_start_date', 'ASC']],
            where: { status: 1 },
            attributes: ['event_id', 'event_name', 'event_fees', 'event_type'],

            include: [{
                model: college_master,
                attributes: ['college_id', 'college_name'],

                include: [{
                    model: state_master,
                    attributes: ['state_id', 'state_name']
                }, {
                    model: city_master,
                    attributes: ['city_id', 'city_name']
                },]
            }]
        });

        if (list) {
            res.json({ status: 1, message: "Event List Found", data: list });
        } else {
            res.json({ status: 0, message: "Event List not Found!", data: {} });
        }
    }
    catch (error) {
        console.log('\nMasterController.getUpcomingEventList error', error)
        throw error;
    }
}
/* ************ User Add ************ */
exports.bookingAdd = async (req, res) => {
    console.log('\nMasterController.bookingAdd triggered -->');

    const { booking_master, db1Conn } = await getModels();
    var today_date = moment(new Date()).format("YYYY/MM/DD");

    try {
        let list = await booking_master.findAll({
            where: {
                event_id: req.body.event_id,
                user_id: req.body.user_id,
            },
        });
        if (list == 0 || list == []) {
            await booking_master.create({
                team_id: 0,
                user_id: req.body.user_id,
                event_id: req.body.event_id,
                college_id: req.body.college_id,
                status: 1,
                booking_date: today_date,
            });
            res.json({ status: 1, message: "Booking Added Successfully.", data: {} });
        }
        else {
            res.json({ status: 0, message: "Booking Already Exists.", data: {} });
        }
    }
    catch (error) {
        console.log('\nMasterController.bookingAdd error', error)
        throw error;
    }
}

/* ************ review Add ************ */
exports.reviewAdd = async (req, res) => {
    console.log('\nMasterController.userAdd triggered -->');

    const { review_master, db1Conn } = await getModels();
    var today_date = moment(new Date()).format("YYYY/MM/DD");

    try {
        await review_master.create({
            event_id: req.body.event_id,
            user_id: req.body.user_id,
            comment: req.body.comment,
            review_date: today_date,
            status: 1,
        });
        res.json({ status: 1, message: "Review Added Successfully.", data: {} });
    }
    catch (error) {
        console.log('\nMasterController.userAdd error', error)
        throw error;
    }
}

/* ************ review view ************ */
exports.reviewView = async (req, res) => {
    console.log('\nMasterController.reviewView triggered -->');

    const { review_master, event_master, user_master, db1Conn } = await getModels();
    var today_date = moment(new Date()).format("YYYY/MM/DD");

    try {
        let list = await review_master.findAll({
            order: [['review_date', 'ASC']],
            where: { status: 1 },
            attributes: ['event_id', 'user_id', 'comment', 'review_date'],

            include: [{
                model: event_master,
            }, {
                model: user_master,
            }]
        });

        if (list) {
            res.json({ status: 1, message: "Event List Found", data: list });
        } else {
            res.json({ status: 0, message: "Event List not Found!", data: {} });
        }
    }
    catch (error) {
        console.log('\nMasterController.reviewView error', error)
        throw error;
    }
}
/* ************ User By Id ************ */
exports.getUserById = async (req, res) => {
    console.log('\nMasterController.getUserById triggered -->');

    const { user_master, db1Conn } = await getModels();

    try {
        let list = await user_master.findAll({
            where: {
                user_id: req.body.user_id,
            },
        });

        if (list == 0 || list == []) {
            res.json({ status: 0, message: "No Such User Exists.", data: {} });
        }
        else {
            res.json({ status: 1, message: "User Found Successfully.", data: { list } });

        }
    }
    catch (error) {
        console.log('\nMasterController.getUserById error', error)
        throw error;
    }
}