const express = require('express');
const cartRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const {createCart, 
    getCartByUserId,
    getCartItemsByCartId,
    setCartInactive, }= require('../db/cart')


cartRouter.get('/cart/:cartId')
