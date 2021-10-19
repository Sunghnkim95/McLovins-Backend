const client  = require('./client');

async function createCartItem({cartId, product_id, item_quantity, price}) {
    try {
      const { rows: [item] } = await client.query(`
        INSERT INTO cart_item (cartId, product_id, item_quantity, price)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `, [cartId, product_id, item_quantity, price]);
      return item;
    } catch (error) {
      throw error;
    }
}

//will get all the items in a cart
async function getItemsByCartId(cartId){
    try{
        const {rows} = await client.query(`
        SELECT * FROM cart_item
        where cartId = $1;
        `, [cartId])
        return rows
    }catch(error){
        throw error
    }productRouter
}

//update CartItem quantity, wont allow for updating price right now total price should be
//calculated at front end by quantity * price
//may make an additional price update function in the future which will update price only
//if price is lower than originally
async function updateCartItemQuantity({item_quantity, cartItemId}){
    try{
        const {rows}= await client.query(`
        UPDATE cart_item
        SET item_quantity = $1
        where id = $2
        RETURNING *;
        `,[item_quantity, cartItemId])
        return rows
    }catch(error){
        throw error
    }
}

async function deleteCartItem(cartItemId){
     try{
        const {rows}= await client.query(`
        DELETE FROM cart_item
        WHERE id= $1
        RETURNING *;
        `,[cartItemId])
        return rows
    }catch(error){
        throw error
    }
}

async function getProductQuantity({id}) {
    try {
        const { rows: [ productQuantity ] } = await client.query(`
        SELECT quantity
        FROM product
        WHERE id = $1
        RETURNING *;
        `, [id]);
        return productQuantity;
    } catch (error){
        throw error
    }
}

//amount for this would come from front end
async function checkQuantity({id, amount}) {  
    try {
        const { rows: [ productQuantity ] } = await client.query(`
        SELECT quantity
        FROM product
        WHERE id = $1
        RETURNING *;
        `, [id]);
        if (productQuantity >= amount){
            console.log("add it to cart");
            return true
        }else {
            throw {
                name: "insufficientQuantity",
                message: "THERE ARE NOT ENOUGH OF THIS ITEM IN STOCK."
            }
        }
    }catch (error){
            throw error
    }
}


module.exports = {
    client,
    createCartItem,
    getItemsByCartId,
    updateCartItemQuantity,
    deleteCartItem,
    getProductQuantity,
    checkQuantity
  }





//     CREATE TABLE cart_item (
//     id SERIAL PRIMARY KEY,
//     product_id INTEGER REFERENCES product(id),
//     item_quantity INTEGER NOT NULL,
//     price DECIMAL(10,2) NOT NULL
//   );

// CREATE TABLE product (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(255) UNIQUE NOT NULL,
//     description VARCHAR(255) NOT NULL,
//     category VARCHAR(255) NOT NULL,
//     quantity INTEGER NOT NULL,
//     price DECIMAL(10,2) NOT NULL,
//     photo VARCHAR(255) NOT NULL
//     );