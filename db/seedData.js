const {
  createUser,
} = require('./users')
const client = require('./client');
const {getAllUsers} = require('./index');


async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    // have to make sure to drop in correct order
    await client.query(`
    DROP TABLE IF EXISTS order_history;
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS cart_item;
    DROP TABLE IF EXISTS product;
    DROP TABLE IF EXISTS users;
    `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  
  try {
  console.log("Starting to build tables...");

  await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      admin BOOLEAN NOT NULL,
      UNIQUE ("username","email")
    );
    CREATE TABLE product (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      description VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      quantity INTEGER NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      photo VARCHAR(255) NOT NULL
      );
    CREATE TABLE cart_item (
      id SERIAL PRIMARY KEY,
      product_id INTEGER REFERENCES product(id),
      item_quantity INTEGER NOT NULL,
      price DECIMAL(10,2) NOT NULL
    );
    CREATE TABLE cart (
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "itemId" INTEGER REFERENCES cart_item(id),
      active BOOLEAN
      );
    CREATE TABLE order_history (
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "cartId" INTEGER REFERENCES cart(id),
      placed DATE NOT NULL DEFAULT CURRENT_DATE
      );
    `);
  
  console.log("FINISHED building tables...");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}
async function createInitialUsers() {
  console.log('Starting to create users...');
  try {
    const usersToCreate = [
      { username: 'johnathan', password: 'johnathan', email: 'johnathan@email.com', admin: true },
      { username: 'peter', password: 'peter123', email: 'peter@email.com',admin: true },
      { username: 'michael', password: 'michael1', email: 'michael@email.com',admin: true },
      { username: 'chuck', password: 'chuck123', email: 'chuck@email.com', admin: true },
      { username: 'jay', password: 'jay12345', email: 'jay@email.com',admin: false },
      { username: 'kathryn', password: 'kathryn1', email: 'kathryn@email.com', admin: false }
    ]
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}

/* 

DO NOT CHANGE ANYTHING BELOW. This is default seed data, and will help you start testing, before getting to the tests. 

*/

// 
async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    console.log('Error during rebuildDB')
    throw error;
  }
}

module.exports = {
  rebuildDB
};
