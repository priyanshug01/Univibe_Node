const Sequelize = require("sequelize");

const review_master_schema = {
    schema: {
        // attributes
        review_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        event_id: {
            type: Sequelize.INTEGER
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        review_image: {
            type: Sequelize.CITEXT
        },
        comment: {
            type: Sequelize.TEXT
        },
        review_date: {
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

module.exports = review_master_schema;