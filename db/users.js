const bcrypt = require('bcrypt');
const client  = require('./client');

async function createUser({ username, password, email, admin}) { 
  try {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const { rows: [ user ] } = await client.query(`
      INSERT INTO users(username, password, email, admin) 
      VALUES($1, $2, $3, $4) 
      ON CONFLICT (username, email) DO NOTHING
      RETURNING *;
    `, [username, hashedPassword, email, admin]); 
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
    try {
      const user = await getUserByUsername(username);
      const hashedPassword = user.password;
      const passwordsMatch = await bcrypt.compare(password, hashedPassword);
      if (passwordsMatch) {
        delete user.password;
        return user
    } else {
      return null
    }
  } catch (error) {
      throw error;
    }
  }

  async function getUserById(id) {
    try {
      const { rows: [ user ] } = await client.query(`
        SELECT *
        FROM users
        WHERE id=${ id }
      `);
      if (!user) {
        return null
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async function getUserByUsername(username){
    try {
      const { rows: [ user ] } = await client.query(`
        SELECT *
        FROM users
        WHERE username=$1
      `,[username]);
      if (!user) {
        return null
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
  async function DeleteUserByUsername(username) {
    try {

    } catch (error) {
        throw error;
    }
  }
module.exports =  {
    client,
    createUser,
    getUser,
    getUserById,
    getUserByUsername,
}