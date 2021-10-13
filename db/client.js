// build and export your unconnected client here
const { Client } = require('pg');
require('dotenv').config();
const client = new Client(process.env.DATABASE_URL || 'postgres://localhost:5432/shopper-dev');


module.exports = client