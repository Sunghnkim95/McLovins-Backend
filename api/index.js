const express = require('express');
const apiRouter = express.Router();
const { getUserById } = require('../db/users');
const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
  
    if (!auth) { 
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
  
      try {
        const { id } = jwt.verify(token, JWT_SECRET);
  
        if (id) {
          req.user = await getUserById(id);
          next();
        }
      } catch ({ name, message }) {
        next({ name, message });
      }
    } else {
      next({
        name: 'AuthorizationHeaderError',
        message: `Authorization token must start with ${ prefix }`
      });
    }
  });

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const productRouter = require('./product');
apiRouter.use('/product', productRouter);

const cartRouter = require('./cart');
apiRouter.use('/cart', cartRouter);
  
const cartItemRouter = require('./cart_items');
apiRouter.use('/cart_items', cartItemRouter);

const orderHistoryRouter = require('./order_history');
apiRouter.use('/order_history', orderHistoryRouter);

apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;