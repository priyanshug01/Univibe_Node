const Sequelize = require("sequelize");

const team_master_schema = {
    schema: {
        // attributes
        team_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        college_id: {
            type: Sequelize.INTEGER
        },
        event_id: {
            type: Sequelize.INTEGER
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        team_name: {
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

module.exports = team_master_schema;