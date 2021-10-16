const client  = require('./client');
const {getProductById} = require('./products')

async function createCart ({userId}) {
    try{
        const { rows: [ cart ] } = await client.query(`
        INSERT INTO cart ("userId")
        VALUES ($1)
        RETURNING *;
    `, [userId]); 
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
        WHERE userId =$1
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
        Where cartId = $1;
        `, [cartId])
        return rows
    }catch(error){
        throw error
    }
}

//When cart is submitted cart is then set to inactive
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



module.exports = {
    client,
    createCart,
    getCartByUserId,
    getCartItemsByCartId,
    setCartInactive,

    
  }
