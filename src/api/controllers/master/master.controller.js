const { getModels } = require('../../models');
const moment = require('moment');
const { Op } = require('sequelize');

const multer = require('multer');
const path = require('path');
const department_master_schema = require('../../models/master/department_master');

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
            attributes: ['event_id', 'event_image', 'event_name'],
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
            let user_data = await user_master.create({
                role_id: 5,
                college_id: req.body.college_id,
                department_id: req.body.department_id,
                user_name: req.body.user_name,
                user_email: req.body.user_email,
                user_password: req.body.user_password,
                user_contact: '',
                status: 1,
            });
            res.json({ status: 1, message: "User Added Successfully.", data: user_data });
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
    const { event_master, user_master, department_master, db1Conn } = await getModels();
    console.log(`\n req.body: `, req.body);
    var today_date = moment(new Date()).format("YYYY/MM/DD");

    try {
        let list = await event_master.findAll({
            order: [['registration_end_date', 'ASC']],
            where: {
                status: 1,
                registration_start_date: {
                    [Op.lte]: today_date
                },
                event_end_date: {
                    [Op.gte]: today_date
                }
            },
            attributes: ['event_id', 'event_name', 'event_image', 'event_fees', 'event_end_date', 'event_type'],
            include: [{
                model: user_master,
                attributes: ['user_id'],
                include: [{
                    model: department_master,
                    attributes: ['department_code'],
                }],
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
    const { event_master, user_master, department_master, db1Conn } = await getModels();
    console.log(`\n req.body: `, req.body);
    var today_date = moment(new Date()).format("YYYY/MM/DD");

    try {
        let list = await event_master.findAll({
            order: [['registration_start_date', 'ASC']],
            where: {
                status: 1,
                registration_start_date: {
                    [Op.gte]: today_date
                },
            },
            attributes: ['event_id', 'event_name', 'event_image', 'event_fees', 'event_end_date', 'event_type'],

            include: [{
                model: user_master,
                attributes: ['user_id'],
                include: [{
                    model: department_master,
                    attributes: ['department_code'],
                }],
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

    const { booking_master, user_master, db1Conn } = await getModels();
    var today_date = moment(new Date()).format("YYYY/MM/DD");

    try {
        let user_email = req.body.user_email;
        let list_email = await user_master.findOne({
            where: {
                user_email: user_email,
            },
        });
        if (list_email) {
            let list = await booking_master.findAll({
                where: {
                    event_id: req.body.event_id,
                    user_id: list_email.user_id,
                },
            });
            if (list == 0 || list == []) {
                await booking_master.create({
                    team_id: req.body.team_id,
                    user_id: list_email.user_id,
                    event_id: req.body.event_id,
                    college_id: req.body.college_id,
                    status: 1,
                    semester: req.body.semester,
                    roll_number: req.body.roll_number,
                });
                res.json({ status: 1, message: "Booking Added Successfully.", data: {} });
            }
            else {
                res.json({ status: 0, message: "Booking Already Exists.", data: {} });
            }
        } else {
            res.json({ status: 0, message: "Mail Id Not Exists.", data: {} });
        }
    }
    catch (error) {
        console.log('\nMasterController.bookingAdd error', error)
        throw error;
    }
}
/* ************ User Add ************ */
exports.teamAdd = async (req, res) => {
    console.log('\nMasterController.bookingAdd triggered -->');

    const { team_master, db1Conn } = await getModels();
    var today_date = moment(new Date()).format("YYYY/MM/DD");

    try {
        let list = await team_master.findAll({
            where: {
                event_id: req.body.event_id,
                user_id: req.body.user_id,
            },
        });
        if (list == 0 || list == []) {
            let team_data = await team_master.create({
                college_id: req.body.college_id,
                event_id: req.body.event_id,
                user_id: req.body.user_id,
                team_name: req.body.team_name,
                status: 1,
            });
            res.json({ status: 1, message: "Booking Added Successfully.", data: team_data.team_id });
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
/* ************ Review Add ************ */
exports.reviewAdd = async (req, res) => {
    const { review_master, db1Conn } = await getModels();
    var today_date = moment(new Date()).format("YYYY/MM/DD");

    try {
        // File upload code start
        //let upload = multer({ storage: storage, fileFilter: imageFilter }).array('pic', 2);
        let upload = multer({ storage: storage, fileFilter: imageFilter }).single('pic');

        upload(req, res, function async(err) {
            console.log(" calling multer ");
            const formData = req.body;
            // req.file contains information of uploaded file
            // req.body contains information of text fields, if there were any

            if (req.fileValidationError) {
                return res.send("validation error: " + req.fileValidationError);
            }
            else if (!req.file) {
                return res.send('Please select an file to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send("multer error: " + err);
            }
            else if (err) {
                return res.send("other error: " + err);
            }
            let temp = [{ a: 1 }];
            Promise.all(temp.map(async (k) => {
                await review_master.create({
                    event_id: formData.event_id,
                    user_id: formData.user_id,
                    review_image: req.file.filename,
                    comment: formData.comment,
                    status: formData.status,
                });

                res.json({ status: 1, message: "Review Add successfully.", data: {} });

            }))
        });

    }
    catch (error) {
        console.log('\error', error)
        throw error;
    }
}

/* ************ Review List ************ */
exports.reviewList = async (req, res) => {
    console.log('\nMasterController.reviewList triggered -->');

    const { review_master, event_master, user_master, db1Conn } = await getModels();
    var today_date = moment(new Date()).format("YYYY/MM/DD");

    try {
        let list = await review_master.findAll({
            order: [['review_date', 'ASC']],
            where: { status: 1 },
            include: [{
                model: event_master,
                attributes: ['event_name'],
            }, {
                model: user_master,
                attributes: ['user_name'],
            }]
        });

        if (list) {
            res.json({ status: 1, message: "Event List Found", data: list });
        } else {
            res.json({ status: 0, message: "Event List not Found!", data: {} });
        }
    }
    catch (error) {
        console.log('\nMasterController.reviewList error', error)
        throw error;
    }
}
/* ************ User By Id ************ */
exports.getUserById = async (req, res) => {
    console.log('\nMasterController.getUserById triggered -->');

    const { department_master, college_master, user_master, db1Conn } = await getModels();

    try {
        let list = await user_master.findAll({
            include: [{
                model: department_master,
                attributes: ['department_code'],
            }, {
                model: college_master,
                attributes: ['college_name'],
            }],
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

/* ************ Event Add ************ */
exports.eventAdd = async (req, res) => {
    const { event_master, db1Conn } = await getModels();
    var today_date = moment(new Date()).format("YYYY/MM/DD");

    try {
        // File upload code start
        //let upload = multer({ storage: storage, fileFilter: imageFilter }).array('pic', 2);
        let upload = multer({ storage: storage, fileFilter: imageFilter }).single('pic');

        upload(req, res, function async(err) {
            console.log(" calling multer ");
            const formData = req.body;
            // req.file contains information of uploaded file
            // req.body contains information of text fields, if there were any

            if (req.fileValidationError) {
                return res.send("validation error: " + req.fileValidationError);
            }
            else if (!req.file) {
                return res.send('Please select an file to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send("multer error: " + err);
            }
            else if (err) {
                return res.send("other error: " + err);
            }
            let temp = [{ a: 1 }];
            Promise.all(temp.map(async (k) => {
                await event_master.create({
                    college_id: formData.college_id,
                    user_id: formData.user_id,
                    event_start_date: formData.event_start_date,
                    event_start_time: formData.event_start_time,
                    event_end_date: formData.event_end_date,
                    registration_start_date: formData.registration_start_date,
                    registration_end_date: formData.registration_start_date,
                    event_venue: formData.event_venue,
                    event_image: req.file.filename,
                    event_type: formData.event_type,
                    event_name: formData.event_name,
                    event_team_members: formData.event_team_members,
                    event_fees: formData.event_fees,
                    event_organisation: formData.event_organisation,
                    event_motto: formData.event_motto,
                    event_description: formData.event_description,
                    event_rounds: formData.event_rounds,
                    event_perks: formData.event_perks,
                    event_rules: formData.event_rules,
                    status: formData.status,
                });

                res.json({ status: 1, message: "Event Add successfully.", data: {} });

            }))
        });

    }
    catch (error) {
        console.log('\error', error)
        throw error;
    }
}

/* ************ Favourite Add ************ */
exports.favouriteAdd = async (req, res) => {
    console.log('\nMasterController.favouriteAdd triggered -->');

    const { favourite_master, event_master, db1Conn } = await getModels();
    var today_date = moment(new Date()).format("YYYY/MM/DD");

    try {
        let ev_ex = await favourite_master.findOne({
            where: { event_id: req.body.event_id, user_id: req.body.user_id, },
        });
        if (!ev_ex) {
            let event_details = await event_master.findOne({
                where: { event_id: req.body.event_id },
            });
            await favourite_master.create({
                event_id: req.body.event_id,
                user_id: req.body.user_id,
                event_end_date: event_details.event_end_date,
                status: req.body.status,
            });
            res.json({ status: 1, message: "Favourite Added Successfully.", data: {} });
        } else {
            await favourite_master.update({
                status: req.body.status,
            }, {
                where: {
                    event_id: req.body.event_id,
                    user_id: req.body.user_id,
                }
            });
            res.json({ status: 1, message: "Favourite Update Successfully.", data: {} });
        }
    }
    catch (error) {
        console.log('\nMasterController.favouriteAdd error', error)
        throw error;
    }
}

/* ************ Get Favourite Event List ************ */
exports.getFavouriteEventList = async (req, res) => {
    console.log('\nMasterController.getFavouriteEventList triggered -->');
    const { favourite_master, event_master, user_master, department_master, db1Conn } = await getModels();
    console.log(`\n req.body: `, req.body);
    try {
        let v_list = await favourite_master.findAll({
            include: [{
                model: event_master,
                attributes: ['event_id', 'event_name', 'event_image', 'event_fees', 'event_end_date', 'event_type'],
                include: [{
                    model: user_master,
                    attributes: ['user_id'],
                    include: [{
                        model: department_master,
                        attributes: ['department_code'],
                    }],
                }],
            }],
            where: {
                user_id: req.body.user_id,
                status: 1,
            }

        });

        res.json({ status: 1, message: "Favourite Event List Found", data: v_list });
    }
    catch (error) {
        console.log('\nMasterController.getFavouriteEventList error', error)
        throw error;
    }
}

/* ************ Get User Event History List ************ */
exports.getUserEventHistory = async (req, res) => {
    console.log('\nMasterController.getUserEventHistory triggered -->');
    const { booking_master, event_master, user_master, department_master, db1Conn } = await getModels();
    console.log(`\n req.body: `, req.body);
    try {
        let v_list = await booking_master.findAll({
            include: [{
                model: event_master,
                attributes: ["event_id", "event_image", "event_type", "event_name"],
            }, {
                model: user_master,
                include: [{
                    model: department_master,
                }],
            }],
            where: {
                user_id: req.body.user_id
            }
        });

        res.json({ status: 1, message: "History List Found", data: v_list });
    }
    catch (error) {
        console.log('\nMasterController.getUserEventHistory error', error)
        throw error;
    }
}
/* ************ Get Event Details List ************ */
exports.getEventDetail = async (req, res) => {
    console.log('\nMasterController.getEventDetail triggered -->');
    const { event_master, user_master, department_master, db1Conn } = await getModels();
    console.log(`\n req.body: `, req.body);
    try {
        let list = await event_master.findAll({
            where: { event_id: req.body.event_id, },
            include: [{
                model: user_master,
                attributes: ['user_id'],
                include: [{
                    model: department_master,
                    attributes: ['department_code'],
                }],
            }],
        });

        if (list) {
            res.json({ status: 1, message: "Event Details Found", data: list });
        } else {
            res.json({ status: 0, message: "Event Details not Found!", data: {} });
        }
    }
    catch (error) {
        console.log('\nMasterController.getEventDetail error', error)
        throw error;
    }
}

/* ************ Booking Update ************ */
exports.bookingCancel = async (req, res) => {
    console.log('\nMasterController.favouriteAdd triggered -->');

    const { booking_master, db1Conn } = await getModels();
    var today_date = moment(new Date()).format("YYYY/MM/DD");

    try {
        await booking_master.update({
            status: 0,
        }, {
            where: {
                event_id: req.body.event_id,
                user_id: req.body.user_id,
            }
        });
        res.json({ status: 1, message: "Booking Cancel Successfully.", data: {} });
    }
    catch (error) {
        console.log('\nMasterController.favouriteAdd error', error)
        throw error;
    }
}