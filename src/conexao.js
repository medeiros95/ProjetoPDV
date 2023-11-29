const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.ELEPHANT_HOST,
        user: process.env.ELEPHANT_USER,
        password: process.env.ELEPHANT_PASS,
        database: process.env.ELEPHANT_NAME,
        port: process.env.ELEPHANT_PORT,
        ssl: { rejectUnauthorized: false }
    }
});

module.exports = knex;