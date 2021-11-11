const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const {
    createUser,
    getUser,
    getUserByUsername,
    getUserById,
    updateUser,
    adminUpdateUser,
    deleteUser,
    getCartByUserId,
    getOrderHistoryByUserId,
    getAllUsers,
    getUserByEmail
} = require('../db')


usersRouter.use((req, res, next) => {
    next();
  });

usersRouter.get('/allUsers', async (req, res, next) => {
  try {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
    const token = auth?auth.slice(prefix.length):null;
    const { admin } = jwt.verify(token, JWT_SECRET);

    if (admin){
      const users = await getAllUsers();
      res.send({
        users
      })
    } else {
      next({
        message: "Invalid Token"
      })
    }	  
  } catch (error) {
      throw (error)
  }
});
  
usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
      next({
        name: "MissingCredentialsError",
        message: "Please supply both a username and password",
      });
    }

    try {
      const user = await getUser({username: username, password: password});
      
      if (!user) {
        res.status(401)
        next({
          name: "IncorrectCredentialsError",
          message: "Username or password is incorrect",
        });
      } else {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          admin: user.admin
        },
        JWT_SECRET,
        {expiresIn: "1w"}
      );
    
      res.send({
        user: user,
        message: "you're logged in!",
        token: token
      });
    }
      
    } catch ({ name, message }) {
      next({ name, message });
    }
  });


  usersRouter.post('/register', async (req, res, next) => {
    const {username, password, email} = req.body;
    try {
        const _user = await getUserByUsername(username);
        const _email= await getUserByEmail(email);
        if (_user){
            res.status(401)
            next({
                name: "UserExistsError",
                message: "A user by that username already exists"
            })
        } else if (_email){
          res.status(401)
          next({
              name: "emailExistsError",
              message: "That Email address is already registered to an account"
          })
      }
        else if (password.length < 8){
            res.status(401)
            next({
                name: "PasswordTooShortError",
                message: "Please enter a longer password"
            })
        } else {
            const user = await createUser({
                username, password, email
            })
            res.send({user})
        } 
    }
     catch (error){
        throw (error)
    }
}) 

usersRouter.get('/me', async (req, res, next) => {
    try{
      const prefix = 'Bearer ';
      const auth = req.header('Authorization');
      const token = auth?auth.slice(prefix.length):null;
      const { id } = jwt.verify(token, JWT_SECRET);
      if (id) {
        const me = await getUserById(id);
        res.send({ 
          username: me.username,
          email: me.email,
          admin: me.admin,
          street: me.street,
          city: me.city,
          state: me.state,
          zip: me.zip,
          token: token
        });
      }
    } catch(error) {
        console.error(error);
        next(error);
      }
    })
   
usersRouter.get('/:userId/cart', async (req, res, next)=> {
  const { userId } = req.params
  try {
    const prefix = 'Bearer ';
      const auth = req.header('Authorization');
      const token = auth?auth.slice(prefix.length):null;
      const { id } = jwt.verify(token, JWT_SECRET);
      if (id === parseInt(userId)){
        const cart = await getCartByUserId(id)
        res.send(cart)
      } else {
        next({
          message: "Invalid Token"
        })
      }	  
    } catch(error){
      throw (error)
    }
})

usersRouter.get('/:userId/order_history', async (req, res, next)=> {
    const { userId } = req.params
    try {
      const prefix = 'Bearer ';
      const auth = req.header('Authorization');
      const token = auth?auth.slice(prefix.length):null;
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id === userId){
        const orderHistory = await getOrderHistoryByUserId(id)
        res.send(orderHistory)
      } else {
        next({
          message: "Invalid Token"
        })
      }	  
      } catch(error){
        throw (error)
      }
  })

  usersRouter.post('/anonymouslogin', async (req, res, next) => {
    const { fullname , email, address, city, state, zip, cardname, cardnumber, expmonth, expyear, cvv } = req.body;

    if (!fullname || !email || !address || !city || !state || !zip || !cardname || !cardnumber || !expmonth || !expyear || !cvv ) {
      next({
        name: "MissingCredentialsError",
        message: "Missing Input",
      });
    }

    try {
      const user = await getUser({username: 'unknown', password: 'unknown123'});
      
      if (!user) {
        res.status(401)
        next({
          name: "IncorrectCredentialsError",
          message: "This is never wrong",
        });
      } else {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          admin: user.admin
        },
        JWT_SECRET,
        {expiresIn: "1w"}
      );
    
      res.send({
        userId:user.id,
        token: token
      });
    }
      
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  usersRouter.patch('/me', async (req, res, next) => {
    try {
      const prefix = 'Bearer ';
      const auth = req.header('Authorization');
      const token = auth?auth.slice(prefix.length):null;
      const { id } = jwt.verify(token, JWT_SECRET);

      const { email, password} = req.body;
      const passing = {
        email: email, 
        password: password, 
      };
      const updatedUser = await updateUser(id, passing);
  
      res.send(updatedUser);
    } catch (error) {
      next(error);
    }
  });

module.exports = usersRouter;