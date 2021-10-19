const express = require('express');
const cartItemRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const {
    createCartItem,
    getItemsByCartId,
    updateCartItemQuantity,
    deleteCartItem,
    getProductQuantity,
    checkQuantity
} = require('../db')

cartItemRouter.post('/', async (req, res, next) => {
	try {
        const { cartId, product_id, item_quantity, price } = req.body
		const newCartItem = await createCartItem(cartId, product_id, item_quantity, price);
		res.send(newCartItem);
	} catch (error) {
		next(error);
	}
});


cartItemRouter.patch('/:cartItemUpdate', async (req, res, next) => {
	try {

		const { item_quantity, cartItemId} = req.body;
		const passing = {
			cartItemId: cartItemId, 
			item_quantity: item_quantity, 
        };
		const updatedCartItem = await updateCartItemQuantity(passing);
		res.send(updatedCartItem);
	} catch (error) {
		next(error);
	}
});

