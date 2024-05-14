const Sequelize = require("sequelize");

const role_master_schema = {
    schema: {
        // attributes
        role_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role_type: {
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

module.exports = role_master_schema;