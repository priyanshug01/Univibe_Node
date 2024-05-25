const Sequelize = require("sequelize");

const event_master_schema = {
    schema: {
        // attributes
        event_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        college_id: {
            type: Sequelize.INTEGER
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        event_start_date: {
            type: Sequelize.DATEONLY
        },
        event_end_date: {
            type: Sequelize.DATEONLY
        },
        registration_start_date: {
            type: Sequelize.DATEONLY
        },
        registration_end_date: {
            type: Sequelize.DATEONLY
        },
        event_image: {
            type: Sequelize.TEXT
        },
        event_type: {
            type: Sequelize.STRING
        },
        event_name: {
            type: Sequelize.STRING
        },
        event_team_members: {
            type: Sequelize.INTEGER
        },
        event_fees: {
            type: Sequelize.DECIMAL
        },
        event_organisation: {
            type: Sequelize.TEXT
        },
        event_motto: {
            type: Sequelize.TEXT
        },
        event_description: {
            type: Sequelize.TEXT
        },
        event_rounds: {
            type: Sequelize.TEXT
        },
        event_perks: {
            type: Sequelize.TEXT
        },
        event_rules: {
            type: Sequelize.TEXT
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

module.exports = event_master_schema;