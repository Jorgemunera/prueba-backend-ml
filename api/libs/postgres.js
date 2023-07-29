const {Client} = require('pg');

async function getConnection(){
    const client = new Client({
        host: 'localhost',
        port: '5432',
        user: 'admin',
        password:'admin123',
        database: 'market_db'
    });

    await client.connect();
    return client;
}

module.exports = getConnection;