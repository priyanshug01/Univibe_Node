const Sequelize = require("sequelize");

const booking_master_schema = {
    schema: {
        // attributes
        booking_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        team_id: {
            type: Sequelize.INTEGER
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
        status: {
            type: Sequelize.INTEGER
        },
        roll_number: {
            type: Sequelize.STRING
        },
        semester: {
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