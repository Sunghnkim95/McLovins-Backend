// require and re-export all files in this db directory (users, activities...)
const client = require('./client');

  
  // and export them

module.exports = {
    ...require('./users'), // adds key/values from users.js
//     ...require('./products'), // adds key/values from activites.js
//     ...require('./routines'), // etc
//    ...require('./routine_activities') // etc
}