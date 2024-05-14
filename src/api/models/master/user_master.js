const Sequelize = require("sequelize");

const user_master_schema = {
    schema: {
        // attributes
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        college_id: {
            type: Sequelize.INTEGER
        },
        department_id: {
            type: Sequelize.INTEGER
        },
        user_name: {
            type: Sequelize.STRING
        },
        user_email: {
            type: Sequelize.STRING
        },
        user_contact: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.INTEGER
        },
        created_date: {
            type: Sequelize.DATE
        },
        role_id: {
            type: Sequelize.INTEGER
        },
        user_password: {
            type: Sequelize.STRING
        },
    },
    options: {
        // options
        timestamps: false,
        freezeTableName: true,
    }
}

module.exports = user_master_schema;