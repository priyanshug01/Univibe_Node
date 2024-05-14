const Sequelize = require("sequelize");

const booking_master_schema = {
    schema: {
        // attributes
        booking_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        event_id: {
            type: Sequelize.INTEGER
        },
        college_id: {
            type: Sequelize.INTEGER
        },
        booking_date: {
            type: Sequelize.DATE
        },
        payment_id: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.INTEGER
        },

    },
    options: {
        // options
        timestamps: false,
        freezeTableName: true,
    }
}

module.exports = booking_master_schema;