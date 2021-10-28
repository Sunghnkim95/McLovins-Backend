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
		const prefix = 'Bearer ';
		const auth = req.header('Authorization');
		const token = auth?auth.slice(prefix.length):null;
		const { id } = jwt.verify(token, JWT_SECRET);
		const { cartId, product_id, item_quantity, price, userId } = req.body

		if (id === userId){
			const newCartItem = await createCartItem(cartId, product_id, item_quantity, price);
			res.send(newCartItem);
		} else {
			next({
				message: "Invalid Token"
			})
		}	
	} catch (error) {
		next(error);
	}
});


cartItemRouter.patch('/:cartItemUpdate', async (req, res, next) => {
	try {
		const prefix = 'Bearer ';
		const auth = req.header('Authorization');
		const token = auth?auth.slice(prefix.length):null;
		const { id } = jwt.verify(token, JWT_SECRET);
		const { item_quantity, cartItemId, userId} = req.body;
		const passing = {
			cartItemId: cartItemId, 
			item_quantity: item_quantity, 
        };

		if (id === userId){
			const updatedCartItem = await updateCartItemQuantity(passing);
			res.send(updatedCartItem);
		} else {
			next({
				message: "Invalid Token"
			})
		}	
	} catch (error) {
		next(error);
	}
});

