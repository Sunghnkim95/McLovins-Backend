// build and export your unconnected client here
const { Client } = require('pg');
require('dotenv').config();
const client = new Client(process.env.DATABASE_URL || process.env.Connection);


module.exports = client