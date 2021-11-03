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
		if (id === parseInt(userId)){
			const newCartItem = await createCartItem({
				cartId:cartId, 
				product_id:product_id, 
				item_quantity:item_quantity, 
				price:price
			});
			res.send(newCartItem);
		} else {
			next({
				id:id,
				userId:userId,
				message: "Invalid Token Users"
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
		if (id === parseInt(userId)){
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

cartItemRouter.delete('/:cartItemDelete', async (req, res, next) => {
	try {
		const prefix = 'Bearer ';
		const auth = req.header('Authorization');
		const token = auth?auth.slice(prefix.length):null;
		const { id } = jwt.verify(token, JWT_SECRET);
		const { cartItemId, userId} = req.body;
		const passing = {
			cartItemId: cartItemId, 
        };

		if (id === parseInt(userId)){
			const deleteCartItem = await deleteCartItem(passing);
			console.log('inside if statement', deleteCartItem)
			res.send(deleteCartItem);
		} else {
			next({
				message: "Invalid Token"
			})
		}	
	} catch (error) {
		next(error);
	}
});

module.exports = cartItemRouter; 