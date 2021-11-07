const express = require('express');
const cartRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const {
	createCart, 
    getCartByUserId,
    getCartItemsByCartId,
    setCartInactive, 
	checkCartItemByProduct
}= require('../db')

cartRouter.use((req, res, next) => {
    next(); 
});

cartRouter.get('/:userId', async (req, res, next) => {
	try {
		const prefix = 'Bearer ';
		const auth = req.header('Authorization');
		const token = auth?auth.slice(prefix.length):null;
		const { id } = jwt.verify(token, JWT_SECRET);
		const { userId } = req.params

		if (id === parseInt(userId)){
			const cart = await getCartByUserId(id);
			const cartItems = await getCartItemsByCartId(cart.id)
			res.send(cartItems);	  
		} else {
			next({
				message: "Invalid Token"
			})
		}	
	} catch (error) {
		next(error);
	}
});

cartRouter.get('/cart_check/:userId/:cartId/:product_id', async (req, res, next) => {
	try {
		const prefix = 'Bearer ';
		const auth = req.header('Authorization');
		const token = auth?auth.slice(prefix.length):null;
		const { id } = jwt.verify(token, JWT_SECRET);
		const { product_id, userId, cartId } = req.params;

		if (id === parseInt(userId)){
			const checkCart = await checkCartItemByProduct( cartId, product_id);
			res.send(checkCart);	 
		} else {
			next({
				message: "Invalid Token"
			})
		}
	} catch (error) {
		next(error);
	}
});

cartRouter.post('/', async (req, res, next) => {
	try {
		const prefix = 'Bearer ';
		const auth = req.header('Authorization');
		const token = auth?auth.slice(prefix.length):null;
		const { id } = jwt.verify(token, JWT_SECRET);
		const { userId, email, street, city, state, zip } = req.body
		const passing = {
			userId:userId, 
			email:email,
			street:street,
			city:city,
			state:state,
			zip:zip
        };
		if (id === parseInt(userId)){
			const newCart = await createCart(passing);
			res.send(newCart);
		} else {
			next({
				message: "Invalid Token"
			})
		}
	} catch (error) {
		next(error);
	}
});

cartRouter.patch('/cartInactive/:cartId', async (req, res, next) => {
	try {
		const prefix = 'Bearer ';
		const auth = req.header('Authorization');
		const token = auth?auth.slice(prefix.length):null;
		const { id } = jwt.verify(token, JWT_SECRET);
		const { userId } = req.body
		const { cartId } = req.params;
		
		if (id === parseInt(userId)){
			const inactiveCart = await setCartInactive(cartId);
			res.send(inactiveCart);
		} else {
			next({
				message: "Invalid Token"
			})
		}
	} catch (error) {
		next(error);
	}
});

module.exports = cartRouter;