const client  = require('./client');

async function createCartItem({id}) {
    try {
      const { rows: [item] } = await client.query(`
        SELECT name, price
        FROM product
        JOIN cart_item on product.id = cart_item.product_Id
        WHERE product.id=$1;
      `, [id]);
      return item;
    } catch (error) {
      throw error;
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
async function updateQuantity({id, amount}) {  
    let newQuantity;
    try {
        const { rows: [ productQuantity ] } = await client.query(`
        SELECT quantity
        FROM product
        WHERE id = $1
        RETURNING *;
        `, [id]);
        if (productQuantity >= amount){
            newQuantity = productQuantity-amount;
            const { rows: [ updatedQuantity ] } =await client.query(`
            UPDATE product
            SET quantity = $1
            WHERE id = $2
            RETURNING *;
            `, [newQuantity, id]);
            return updatedQuantity
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
    getProductQuantity,
    updateQuantity
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