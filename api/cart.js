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
    console.log("A request is being made to /carts");
    next(); 
});
/*
cartRouter.get('/', async (req, res, next) => {
	try {
		const { id } = req.params
		const cart = await getCartByUserId(id);	
		res.send(cart);	  
	} catch (error) {
		next(error);
	}
});
*/
cartRouter.get('/cart', async (req, res, next) => {
	try {
		const prefix = 'Bearer ';
		const auth = req.header('Authorization');
		const token = auth?auth.slice(prefix.length):null;
		const { id } = jwt.verify(token, JWT_SECRET);
		const { userId } = req.body
		if (id === userId){
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

cartRouter.get('/cart/:product_id', async (req, res, next) => {
	try {
		const prefix = 'Bearer ';
		const auth = req.header('Authorization');
		const token = auth?auth.slice(prefix.length):null;
		const { id } = jwt.verify(token, JWT_SECRET);
		const { userId, cartId } = req.body
		const { product_id } = req.params;

		if (id === userId){
			const checkCart = await checkCartItemByProduct(product_id, cartId);
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
		const { userId } = req.body

		if (id === userId){
			const newCart = await createCart(req.body);
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

/*
//cartRouter.get('/cart/:cartId')
routineRouter.get('/cart/:cartId', async (req, res, next) => {
    const { cartId } = req.params;
	try {
	   const cart = await getCartByUserId();	
       const cart_items = await getCartItemsByCartId(cartId);   
	   res.send(cart);	   
	} catch (error) {
	   next(error);
   }
});
*/

cartRouter.patch('/cartInactive/:cartId', async (req, res, next) => {
	try {
		const prefix = 'Bearer ';
		const auth = req.header('Authorization');
		const token = auth?auth.slice(prefix.length):null;
		const { id } = jwt.verify(token, JWT_SECRET);
		const { userId } = req.body
		const { cartId } = req.params;
		const passing = {
			id: cartId, 
        };
		if (id === userId){
			const inactiveCart = await setCartInactive(passing);
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