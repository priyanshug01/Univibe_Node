const Sequelize = require("sequelize");

const favourite_master_schema = {
    schema: {
        // attributes
        favourite_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        event_id: {
            type: Sequelize.INTEGER
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.INTEGER
        },
        event_date: {
            type: Sequelize.DATE
        },
    },
    options: {
        // options
        timestamps: false,
        freezeTableName: true,
    }
}

module.exports = favourite_master_schema;