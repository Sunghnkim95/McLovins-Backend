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
  
  async function updateUser (fields) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
      ).join(', ');
    const {id, username, password, email, active} = fields;

      if (setString.length === 0) {
        return;
      }
      
    try {
        const { rows: [ user ] } = await client.query(`
        UPDATE users
        SET ${setString}
        WHERE id = ${id}
        RETURNING *;
        `, [id, username, password, email, active]);
        return user;
    } catch (error){
        throw error
    }
}

async function adminUpdateUser (fields) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
      ).join(', ');
    const {id, active} = fields;

      if (setString.length === 0) {
        return;
      }
      
    try {
        const { rows: [ user ] } = await client.query(`
        UPDATE users
        SET ${setString}
        WHERE id = ${id}
        RETURNING *;
        `, [id, active]);
        return user;
    } catch (error){
        throw error
    }
}

async function deleteUser(id){
    try{
       const {rows: [user]} = await client.query(`
           DELETE FROM users
           WHERE id=$1;
       `, [id])
    }catch (error){
        throw error;
    }
   }

module.exports =  {
    client,
    createUser,
    getUser,
    getUserById,
    getUserByUsername,
    updateUser,
    adminUpdateUser,
    deleteUser
}

