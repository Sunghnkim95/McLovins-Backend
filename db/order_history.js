const client  = require('./client');

async function createOrderHistory ({userId, cartId, fullname , email, address, city, state, zip, cardname, cardnumber, expmonth, expyear, cvv}) {
    try{
        const { rows: [ orders ] } = await client.query(`
        INSERT INTO order_history ("userId", "cartId", "fullname" , "email", "street", "city", "state", "zip", "cardname", "cardnumber", "expmonth", "expyear", "cvv")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING *;
    `, [userId, cartId, fullname , email, address, city, state, zip, cardname, cardnumber, expmonth, expyear, cvv]); 
    return orders;
    }catch (error){
        throw error;
    }
}

async function getOrderHistoryByUserId(userId) {
    try{
        const { rows } = await client.query(`
        SELECT * FROM order_history
        WHERE userId =$1;
        `, [userId])
        return rows
    }catch (error){
        throw error;
    }
}

module.exports = {
    getOrderHistoryByUserId,
    createOrderHistory,
    client
}