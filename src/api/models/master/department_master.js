const Sequelize = require("sequelize");

const department_master_schema = {
    schema: {
        // attributes
        department_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        department_code: {
            type: Sequelize.STRING
        },
        department_name: {
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

module.exports = department_master_schema;