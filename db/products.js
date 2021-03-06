const bcrypt = require('bcrypt');
const client  = require('./client');

async function getProductById(id) {
    try{
        const  {rows : [product]}  = await client.query(`
        SELECT *
        FROM product
        WHERE id=$1;
        `, [id])
    
    return product
    }catch (error){
        throw error;
    }
}
async function getProductByCategory(category) {
    try{
        const  {rows : product}  = await client.query(`
        SELECT *
        FROM product
        WHERE category=$1;
        `, [category])
    return product
    }catch (error){
        throw error;
    }
}
async function getProductByName(name) {
    try{
        const  {rows : [product]}  = await client.query(`
        SELECT *
        FROM product
        WHERE name=$1;
        `, [name])
    return product
    }catch (error){
        throw error;
    }
}
async function getAllProducts(){
    try{
        const { rows } = await client.query(`
        SELECT *
        FROM product;
        `)
        return rows
    }catch (error){
        throw error
    }
}
async function createProduct({ name, description, category, quantity, price, photo}) {
    try{
        const  {rows : [product] }  = await client.query(`
        INSERT INTO product (name, description, category, quantity, price, photo)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (name) DO NOTHING 
        RETURNING *;
        `, [name, description, category, quantity, price, photo])
    return product
    }catch (error){
        throw error;
    }
}
async function updateProduct (fields) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
      ).join(', ');
     
    const {id, name, description, category, quantity, price, photo} = fields;        
    const parsedId = parseInt(id)
    const parsedQuant = parseInt(quantity)
    const parsedPrice = parseFloat(price).toFixed(2)
      if (setString.length === 0) {
        return;
      } 

    try {
        const { rows } = await client.query(`
        UPDATE product
        SET (name, description, category, quantity, price, photo) = ($1, $2, $3, $4, $5, $6)
        WHERE id = $7
        RETURNING *;
        `, [name, description, category, parsedQuant, parsedPrice, photo, parsedId]);
        return rows;
    } catch (error){
        throw error
    }
}
async function deleteProduct(id){
    try{
        await client.query(`
        DELETE FROM cart_item
        WHERE "product_id"=$1 AND cartid IN (
            SELECT id
            FROM cart
            WHERE "active"=TRUE
        );
        `, [id])
        const {rows: product} = await client.query(`
           DELETE FROM product
           WHERE id=$1
           RETURNING *;
        `, [id])
       return product;
    }catch (error){
        throw error;
    }
}



module.exports = {
    client,
    getProductById,
    createProduct,
    getAllProducts, 
    updateProduct,
    getProductByName,
    deleteProduct,
    getProductByCategory
  }