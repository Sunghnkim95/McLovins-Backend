const client  = require('./client');
const {getProductById} = require('./products')

async function createCart () {
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
        const { rows: [ cart ] = await client.query(`
        SELECT * FROM cart
        WHERE userId =$1
        AND active = true;
        `, [userId])}
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
    // CREATE TABLE product (
    //     id SERIAL PRIMARY KEY,
    //     name VARCHAR(255) UNIQUE NOT NULL,
    //     description VARCHAR(255) NOT NULL,
    //     category VARCHAR(255) NOT NULL,
    //     quantity INTEGER NOT NULL,
    //     price DECIMAL(10,2) NOT NULL,
    //     photo VARCHAR(255) NOT NULL
    //     );


    //  CREATE TABLE cart_item (
    //     id SERIAL PRIMARY KEY,
    //     product_id INTEGER REFERENCES product(id),
    //     item_quantity INTEGER NOT NULL,
    //     price DECIMAL(10,2) NOT NULL
    //   );

    
    //   CREATE TABLE cart (
    //     id SERIAL PRIMARY KEY,
    //     "userId" INTEGER REFERENCES users(id),
    //     "itemId" INTEGER REFERENCES cart_item(id),
            
    //     active BOOLEAN DEFAULT TRUE
    //     );
    

