const Sequelize = require("sequelize");

const state_master_schema = {
    schema: {
        // attributes
        state_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        state_name: {
            type: Sequelize.STRING
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

module.exports = state_master_schema;