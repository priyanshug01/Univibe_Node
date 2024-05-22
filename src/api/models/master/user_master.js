const Sequelize = require("sequelize");

const user_master_schema = {
    schema: {
        // attributes
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role_id: {
            type: Sequelize.INTEGER
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
        user_password: {
            type: Sequelize.STRING
        },
        user_contact: {
            type: Sequelize.STRING
        },
        created_date: {
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

module.exports = user_master_schema;