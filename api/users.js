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
    console.log("A request is being made to /users");
    next();
  });

  usersRouter.get('/', async (req, res) => {
    const users = await getAllUsers();
    res.send({
      users
    });
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
        },
        JWT_SECRET,
        {expiresIn: "1w"}
      );
      console.log("Label", token)
      console.log("label", req.body)
    
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
        res.send({ username: me.username,
          token: token
        });
      }
    } catch(error) {
        console.error(error);
        next(error);
      }
    })
   
usersRouter.get('/:id/cart', async (req, res, next)=> {
  const { id } = req.params
  try {
    
    const cart = await getCartByUserId(id)

    res.send(cart)
    } catch(error){
      throw (error)
    }
})

usersRouter.get('/:id/order_history', async (req, res, next)=> {
    const { id } = req.params
    try {
      
      const orderHistory = await getOrderHistoryByUserId(id)
  
      res.send(orderHistory)
      } catch(error){
        throw (error)
      }
  })

module.exports = usersRouter;