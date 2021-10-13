/* 
DO NOT CHANGE THIS FILE
*/
const client = require('./client');

const { rebuildDB } = require('./seedData');


// inside db/seed.js

// this function should call a query which drops all tables from our database
rebuildDB()
  .catch(console.error)
  .finally(() => client.end());