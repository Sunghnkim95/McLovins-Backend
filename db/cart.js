const client  = require('./client');
const {getProductById} = require('./products')

async function createCart ({userId, email, street, city, state, zip}) {
    try{
        const { rows: [ cart ] } = await client.query(`
        INSERT INTO cart ("userId", "email", "street", "city", "state", "zip")
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `, [userId, email, street, city, state, zip]); 
    return cart;
    }catch (error){
        throw error;
    }
}

//This will get cartId for the current Active cart session of the user
async function getCartByUserId(userId) {
    try{
        const { rows: [ cart ] }= await client.query(`
        SELECT * FROM cart
        WHERE "userId" =$1
        AND active = true;
        `, [userId])
        return cart
    }catch (error){
        throw error;
    }
}

//This will get all of the cart items based on the cartId given
async function getCartItemsByCartId(cartId){
    try{
        const {rows} = await client.query(`
        SELECT * FROM cart_item
        WHERE cartId = $1;
        `, [cartId])
        return rows
    }catch(error){
        throw error
    }
}

async function setCartInactive(cartId){
    try{
        const {rows}= await client.query(`
        UPDATE cart
        SET "active" = false
        WHERE id = ($1)
        RETURNING *;
        `, [ cartId ])
        return rows
    }catch(error){
        throw error
    }
}

async function checkCartItemByProduct(cartId, product_id){
    console.log('hello', cartId, product_id);
    try{
        const {rows} = await client.query(`
        SELECT * FROM cart_item
        WHERE product_id = $1;
        `, [product_id])
        console.log('rows', rows)
        return rows
    }catch(error){
        throw error
    }
}
/*
        const {rows} = await client.query(`
        SELECT * FROM cart_item
        WHERE cartid = $1 AND product_id = $2;
        `, [cartId, product_id])
*/
module.exports = {
    client,
    createCart,
    getCartByUserId,
    getCartItemsByCartId,
    setCartInactive,
    checkCartItemByProduct
  }
