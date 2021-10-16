const bcrypt = require('bcrypt');
const client  = require('./client');

async function getProductById(id) {
    try{
        const  {rows : [product]}  = await client.query(`
        SELECT *
        FROM products
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
        FROM products
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
        FROM products
        WHERE name=$1;
        `, [name])
    return product
    }catch (error){
        throw error;
    }
}
async function getAllProducts(){
    try{
        const {products} = await client.query(`
        SELECT *
        FROM products;
        `)
        return products
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
    const {id, name, description, quantity, price, category, photo} = fields;

      if (setString.length === 0) {
        return;
      }
      
    try {
        const { rows: [ product ] } = await client.query(`
        UPDATE products
        SET ${setString}
        WHERE id = ${id}
        RETURNING *;
        `, [id, name, description, quantity, price, category, photo]);
        return product;
    } catch (error){
        throw error
    }
}
async function deleteProduct(id){
    try{
       const {rows: [product]} = await client.query(`
           DELETE FROM activities
           WHERE id=$1;
       `, [id])
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