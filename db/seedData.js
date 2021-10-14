const {
  createUser,
} = require('./users')
const {
  createProduct,
} = require('./products')
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
      admin BOOLEAN DEFAULT FALSE NOT NULL,
      active BOOLEAN DEFAULT TRUE,
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
      CREATE TABLE cart (
      id SERIAL PRIMARY KEY,
      userId REFRENCES users(id)
      creationDate DATE NOT NULL DEFAULT CURRENT_DATE
      active BOOLEAN DEFAULT TRUE
      );
    CREATE TABLE cart_item (
      id SERIAL PRIMARY KEY,
      cartId REFERENCES cart(id),
      product_id INTEGER REFERENCES product(id),
      item_quantity INTEGER NOT NULL,
      price DECIMAL(10,2) NOT NULL
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
async function createInitialProducts() {
  console.log('Starting to create products...');
  try {
      const productsToCreate = [
        { name: 'MidSummers Night', description: 'An intoxicating and masucline blend of musk, patchouli, sage, and mahogany coolgne. Long-lasting 110 to 150 hours of brun time. 6.6 inches H x 4 inches D.', category: 'candle', quantity: 15, price: 19.00, photo:'https://yankeecandle.scene7.com/is/image/YankeeCandle/115174-1?wid=1000&hei=1000' },
        { name: 'Vanilla', description: 'Sweet and traditional, the essence of vanilla extracted from tropical orchids. Long-lasting 110 to 150 hours of brun time. 6.6 inches H x 4 inches D.', category: 'candle', quantity: 13, price: 19.00, photo:'https://www.queenie2t.com/uploads/6/4/6/1/6461119/8420838_orig.jpg' },
        { name: 'Acqua Di Gio', description: 'Formulated specifically for men, the heart of this enticing aroma exudes a spicy blend of nutmeg and bergamot with cedar rounding out the base notes for a woodsy finish. 3.4 Fl. OZ.', category: 'cologne', quantity: 100, price: 116.00, photo:'https://fimgs.net/mdimg/perfume/375x500.410.jpg' },
        { name: 'Versace Eros', description: 'Introduced in 2012, this eau de toilette for men combines green apple, Italian lemon and mint for a sensation of fresh air and vitality. 3.4 Fl. OZ.', category: 'cologne', quantity: 100, price: 92.00, photo:'https://fimgs.net/mdimg/perfume/375x500.410.jpg' },
        { name: 'Jergens Sweet Citrus Body Butter Body and Hand Lotion', description: 'TAKE A BREAK TO NOURISH YOUR SKIN - Jergens Triple Butter Body Moisturizers feature an ultra-hydrating blend of Shea, Cocoa, and Mango butters and soften skin.', category: 'lotion', quantity: 25, price: 6.00, photo:'https://cdn.shopify.com/s/files/1/0061/7313/0816/products/Declare-Exotic-Body-Lotion---Beauty-Affairs-1630649031_1000x1000.jpg?v=1630649032' },
        { name: 'DECLARE EXOTIC BODY LOTION', description: 'Dermatologically tested and created for sensitive skin.', category: 'lotion', quantity: 41, price: 68.00, photo:'https://fimgs.net/mdimg/perfume/375x500.410.jpg' },
        { name: 'Amber', description: 'Amber incense sticks. A warm amber fragrance with musky notes of cedarwood and soft patchouli. 30 Stick Pack.', category: 'incense', quantity: 20, price: 8.00, photo:'https://cdn.shopify.com/s/files/1/0053/3725/1940/products/mn1_000003_388x.jpg?v=1554405949' },
        { name: 'Apple Crisp', description: 'Apple Crisp™ incense sticks. A warm apple fragrance with notes of caramel, sea salt, juicy pear, sweet vanilla and graham cracker. 30 Stick Pack.', category: 'incense', quantity: 17, price: 8.00, photo:'https://cdn.shopify.com/s/files/1/0053/3725/1940/products/mn1_000598_388x.jpg?v=1554405951' },
        { name: 'Angelica Essential Oil', description: 'Angelica essential oil referred to as the “oil of angels” has soothing and calming aromatic qualities that helps create a relaxing environment heightening spiritual awareness and fostering feelings of inner peace. 5ML', category: 'essential oils', quantity: 56, price: 61.50, photo:'https://images.ctfassets.net/qn2nypdyou3x/skuPrimaryImage3078/cbfc7a755b75c97a068224fcc[…]Angelica_5ml_US_Website_2021.png?q=75&fm=jpg&w=1080&h=1080' },
        { name: 'AUSTRALIAN ERICIFOLIA ESSENTIAL OIL', description: 'Australian Ericifolia essential oil, commonly known as Lavender Tea Tree, synergistically combines the benefits of Tea Tree with the soothing nature of Lavender. 5ML', category: 'essential oils', quantity: 37, price: 62.75, photo:'https://images.ctfassets.net/qn2nypdyou3x/skuPrimaryImage3522/cb735a610ec398e0c52a61b59[…]icifolia_5ml_US_Website_2021.png?q=75&fm=jpg&w=1080&h=1080' },
        ]
      const products = await Promise.all(productsToCreate.map(createProduct));
  
      console.log('Products created:');
      console.log(products);
      console.log('Finished creating products!');
    } catch (error) {
      console.error('Error creating products!');
      throw error;
    }

}




async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts()
  } catch (error) {
    console.log('Error during rebuildDB')
    throw error;
  }
}

module.exports = {
  rebuildDB
};
