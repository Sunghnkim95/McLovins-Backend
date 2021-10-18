const express = require('express');
const cartRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const {
	createCart, 
    getCartByUserId,
    getCartItemsByCartId,
    setCartInactive, }= require('../db')

cartRouter.use((req, res, next) => {
    console.log("A request is being made to /carts");
    next(); 
});

cartRouter.get('/', async (req, res, next) => {
	try {
		//const { id } = req.params.id [2]
		const id = 2
		const cart = await getCartByUserId(id);	
		res.send(cart);	  
	} catch (error) {
		next(error);
	}
});

cartRouter.post('/', async (req, res, next) => {
	try {
		const newCart = await createCart(req.body);
		res.send(newCart);
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

//ayuda me, does the db set it inactive for your ass or do i have to do sht
cartRouter.patch('/:cartId', async (req, res, next) => {
	try {
		const cartId = req.params.id;
		//const {  } = req.body;
		const passing = {
			id: cartId, 
        };
		const inactiveCart = await setCartInactive(passing);
		res.send(inactiveCart);
	} catch (error) {
		next(error);
	}
});

module.exports = cartRouter;