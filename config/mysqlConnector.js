const mysql = require('mysql');
const util = require('util');
const { nibbleHost, nibbleUser, nibblePassword, nibbleDatabase } = require('./config');

let pool = mysql.createPool({
    connectionLimit : 50,
    host     : nibbleHost,
    user     : nibbleUser,
    password : nibblePassword,
    database : nibbleDatabase,
    debug    :  false
});

pool.query = util.promisify(pool.query);

module.exports = pool;
