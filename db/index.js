const client = require('./client');

module.exports = {
    ...require('./users'), 
    ...require('./products'), 
    ...require('./cart_item'), 
    ...require('./order_history'),
    ...require('./cart')
}