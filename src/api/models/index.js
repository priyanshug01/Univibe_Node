'use strict';
// local imports
const { createConnections, SequelizeOp } = require("../datasources").MysqlDataSource;


// ************ Master Modal ************

const booking_master_schema = require('./master/booking_master');
const city_master_schema = require('./master/city_master');
const college_master_schema = require('./master/college_master');
const department_master_schema = require('./master/department_master');
const event_master_schema = require('./master/event_master');
const favourite_master_schema = require('./master/favourite_master');

const payment_master_schema = require('./master/payment_master');
const review_master_schema = require('./master/review_master');
const role_master_schema = require('./master/role_master');
const state_master_schema = require('./master/state_master');
const user_master_schema = require('./master/user_master');
const team_master_schema = require('./master/team_master');

let dbModels;

/**
 * helper functions
 */
async function createDatabases() {
    console.log(`\nIndexModel.createDatabases triggered`);
    // create all Database Connections
    const dbs = await createConnections(['db1']);
    const { db1 } = dbs;

    // master
    const booking_master = db1.define('booking_master', booking_master_schema.schema, booking_master_schema.options);
    const city_master = db1.define('city_master', city_master_schema.schema, city_master_schema.options);
    const college_master = db1.define('college_master', college_master_schema.schema, college_master_schema.options);
    const department_master = db1.define('department_master', department_master_schema.schema, department_master_schema.options);
    const event_master = db1.define('event_master', event_master_schema.schema, event_master_schema.options);
    const favourite_master = db1.define('favourite_master', favourite_master_schema.schema, favourite_master_schema.options);

    const payment_master = db1.define('payment_master', payment_master_schema.schema, payment_master_schema.options);
    const review_master = db1.define('review_master', review_master_schema.schema, review_master_schema.options);
    const role_master = db1.define('role_master', role_master_schema.schema, role_master_schema.options);
    const state_master = db1.define('state_master', state_master_schema.schema, state_master_schema.options);
    const user_master = db1.define('user_master', user_master_schema.schema, user_master_schema.options);
    const team_master = db1.define('team_master', team_master_schema.schema, team_master_schema.options);

    // Relation
    city_master.hasOne(state_master, { foreignKey: 'state_id', sourceKey: 'state_id' });
    state_master.belongsTo(city_master, { foreignKey: 'state_id', targetKey: 'state_id' });

    college_master.hasOne(state_master, { foreignKey: 'state_id', sourceKey: 'state_id' });
    college_master.hasOne(city_master, { foreignKey: 'city_id', sourceKey: 'city_id' });

    event_master.hasOne(college_master, { foreignKey: 'college_id', sourceKey: 'college_id' });
    event_master.hasOne(user_master, { foreignKey: 'user_id', sourceKey: 'user_id' });

    favourite_master.hasMany(event_master, { foreignKey: 'event_id', sourceKey: 'event_id' });

    user_master.hasOne(department_master, { foreignKey: 'department_id', sourceKey: 'department_id' });
    user_master.hasOne(college_master, { foreignKey: 'college_id', sourceKey: 'college_id' });
    user_master.hasOne(role_master, { foreignKey: 'role_id', sourceKey: 'role_id' });

    review_master.hasOne(user_master, { foreignKey: 'user_id', sourceKey: 'user_id' });
    review_master.hasOne(event_master, { foreignKey: 'event_id', sourceKey: 'event_id' });

    // condition
    dbModels = {
        db1Conn: db1,

        booking_master,
        city_master,
        college_master,
        department_master,
        event_master,
        favourite_master,

        payment_master,
        review_master,
        role_master,
        state_master,
        user_master,
        team_master,
    };

    return dbModels;
}

/**
 * Exports
 */
exports.getModels = () => {
    // console.log(`\nIndexModel.getModels triggered`);
    if (dbModels) {
        // console.log(`\ndbModels exist. Returning...`);
        return Promise.resolve(dbModels);
    } else {
        return createDatabases();
    }
}

exports.SequelizeOp = SequelizeOp;