const Sequelize = require("sequelize");

const city_master_schema = {
    schema: {
        // attributes
        city_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        state_id: {
            type: Sequelize.INTEGER
        },
        city_name: {
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

module.exports = city_master_schema;