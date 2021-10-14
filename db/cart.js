const client  = require('./client');
const {getProductById} = require('./products')

async function createCart () {
    try{
        const { rows: [ cart ] } = await client.query(`
        INSERT INTO cart ("userId", "itemId")
        SELECT id, 'data1', 'data2', 'data3'
        FROM cart_items
        WHERE col_a = 'something';
    `, [username, hashedPassword, email, admin]); 
    delete user.password;
    return user;
    }catch (error){
        throw error;
    }
}



module.exports = {
    client,
    
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
    

