const Sequelize = require("sequelize");

const event_master_schema = {
    schema: {
        // attributes
        event_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        college_id: {
            type: Sequelize.INTEGER
        },
        event_name: {
            type: Sequelize.STRING
        },
        event_desc: {
            type: Sequelize.TEXT
        },
        event_date: {
            type: Sequelize.INTEGER
        },
        event_fees: {
            type: Sequelize.DECIMAL
        },
        status: {
            type: Sequelize.INTEGER
        },
        event_type: {
            type: Sequelize.STRING
        },
    },
    options: {
        // options
        timestamps: false,
        freezeTableName: true,
    }
}

module.exports = event_master_schema;