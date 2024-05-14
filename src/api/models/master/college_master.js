const Sequelize = require("sequelize");

const college_master_schema = {
    schema: {
        // attributes
        college_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        city_id: {
            type: Sequelize.INTEGER
        },
        state_id: {
            type: Sequelize.INTEGER
        },
        college_name: {
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

module.exports = college_master_schema;