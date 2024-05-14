'use strict';

// must return the value of env variable
exports.getOsEnv = (key) => {
    if (typeof process.env[key] === 'undefined') {
        throw new Error(`Environment variable ${key} is not set.`);
    }
    if (process.env[key] === '') {
        throw new Error(`Environment variable ${key}'s value is not set.`);
    }
    return process.env[key];
}

// optionally return the value of env variable
exports.getOsEnvOptional = (key) => {
    return process.env[key];
}

// convert a string to decimal number
exports.toNumber = (value) => {
    return parseInt(value, 10);
}

// convert a string to boolean
exports.toBool = (value) => {
    return value === 'true';
}

// normalize server port
exports.normalizePort = (port) => {
    const parsedPort = parseInt(port, 10);
    if (isNaN(parsedPort)) { // named pipe
        return port;
    }
    if (parsedPort >= 0) { // port number
        return parsedPort;
    }
    return false;
}
