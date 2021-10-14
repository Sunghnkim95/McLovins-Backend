// require and re-export all files in this db directory (users, activities...)
const client = require('./client');

  
  // and export them

module.exports = {
    ...require('./users'), 
    ...require('./products'), 
    ...require('./cart_item'), 
//    ...require('./routine_activities') // etc
}