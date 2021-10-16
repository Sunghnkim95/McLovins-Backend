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

//This will get cartId for the current cart session of the user
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

/* async function getAllInactiveCart ({userId}){
    try{
        const {rows} = await client.query (`
        SELECT * FROM cart
        WHERE id = $1 AND status = 'inactive'
        `, [userId]
        );
        if (rows.length>0){
            console.log('inside cart', rows)
            const products = rows[0].product_id
            const productArr = []
            for (i=0; i<products.length; i++){
                console.log('product Id', products[i])
                const {
                    rows: [product]
                } = await client.query(`
                    SELECT * FROM products
                    WHERE id = ${products[i]}
                `);
            productArr.push(product)
            }
            return {id: rows[0].id, products: productArr}
        } else {
            return []
        }
    } catch (error) {
        throw (error)
    }
}*/

module.exports = {
    client,
    createCart,
    getCartByUserId,
    getCartItemsByCartId,
    setCartInactive,

    
  }
