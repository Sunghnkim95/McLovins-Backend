const client  = require('./client');

async function createOrderHistory ({userId, cartId}) {
    try{
        const { rows: [ orders ] } = await client.query(`
        INSERT INTO order_history ("userId", "cartId")
        VALUES ($1, $2)
        RETURNING *;
    `, [userId, cartId]); 
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