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
async function getAllCartItems(){
    try{
        const {rows} = await client.query(`
        SELECT * FROM cart_item;
        `)
        return rows
    }catch(error){
        throw error
    }
}

async function getItemsByCartId(cartId){
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

async function updateCartItemQuantity({item_quantity, cartItemId}){
    try{
        const {rows}= await client.query(`
        UPDATE cart_item
        SET item_quantity = $1
        WHERE id = $2
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

async function checkQuantity({id, amount}) {  
    try {
        const { rows: [ productQuantity ] } = await client.query(`
        SELECT quantity
        FROM product
        WHERE id = $1
        RETURNING *;
        `, [id]);
        if (productQuantity >= amount){
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
    checkQuantity,
    getAllCartItems
  }