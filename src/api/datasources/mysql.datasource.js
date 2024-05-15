'use strict';

// global imports
const Sequelize = require("sequelize");
// local imports
const env = require('../../env');

/**
 * mysql settings
 */
const dbConfig = {
    default: 'db1',
    db1: {
        uri: env.mysql.URI,
        name: "u348782370_univibe",
        username: "u348782370_univibe",
        password: "Univibe@0000",
        options: {
            host: '156.67.64.10',
            dialect: 'mysql',
            // dialectOptions: {
            //     ssl: {
            //         require: true,
            //         rejectUnauthorized: false
            //     }
            // },
            port: '3306',
            pool: {
                max: 60,
                min: 0,
                acquire: 60000,
                idle: 10000000000,
                operatorsAliases: false
            }
        }
    },
};

function createConnection(dbName) {
    console.log('\nMysqlDataSource.createConnection triggered');

    const { uri, name, username, password, options } = dbConfig[dbName];

    // create connection
    const conn = new Sequelize(name, username, password, options);
    conn
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });

    /**
     * Events
     */
    conn.beforeConnect((config) => {
        console.log("beforeConnect hook triggered......");
    });
    conn.afterConnect(conn, (config) => {
        console.log("afterConnect hook triggered......");
    })
    conn.beforeDisconnect((conn) => {
        console.log("beforeDisconnect hook triggered......");
    });
    conn.afterDisconnect((conn) => {
        console.log("afterDisconnect hook triggered......");
    });

    return conn;
}

async function createConnections(dbNames = []) {
    console.log('\nMysqlDataSource.createConnections triggered');

    const dbs = {};

    await Promise.all(dbNames.map(async (dbName) => {
        dbs[dbName] = await createConnection(dbName);
    }));

    return dbs;
}

/**
 * Exports
 */
// exports.createConnection = createConnection;
exports.createConnections = createConnections;
exports.SequelizeOp = Sequelize.Op;

