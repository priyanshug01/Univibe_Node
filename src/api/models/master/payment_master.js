const Sequelize = require("sequelize");

const payment_master_schema = {
    schema: {
        // attributes
        payment_id: {
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
        payment_code: {
            type: Sequelize.INTEGER
        },
        payment_date: {
            type: Sequelize.DATE
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

module.exports = payment_master_schema;