const express = require('express');
const orderHistoryRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const {
    getOrderHistoryByUserId,
    createOrderHistory,
} = require('../db')

orderHistoryRouter.use((req, res, next) => {
    next(); 
});

orderHistoryRouter.post('/', async (req, res, next) => {
	try {
		const prefix = 'Bearer ';
		const auth = req.header('Authorization');
		const token = auth?auth.slice(prefix.length):null;
		const { id } = jwt.verify(token, JWT_SECRET);
		const { userId, cartId,fullname , email, address, city, state, zip, cardname, cardnumber, expmonth, expyear, cvv } = req.body
		const passing = {
			userId: userId, 
			cartId: cartId,
			fullname: fullname,
			email: email,
			address: address,
			city: city,
			state: state,
			zip: zip,
			cardname: cardname,
			cardnumber:cardnumber,
			expmonth:expmonth,
			expyear:expyear,
			cvv:cvv
        };
		if (id === parseInt(userId)){
			const newOrderHistory = await createOrderHistory(passing);
			res.send(newOrderHistory);
		} else {
			next({
				message: "Invalid Token"
			})
		}	
	} catch (error) {
		next(error);
	}
});

orderHistoryRouter.get('/:userId', async (req, res, next) => {
	try {
		const prefix = 'Bearer ';
		const auth = req.header('Authorization');
		const token = auth?auth.slice(prefix.length):null;
		const { id } = jwt.verify(token, JWT_SECRET);
		const { userId } = req.params;

		if (id === parseInt(userId)){
			const orderHistory = await getOrderHistoryByUserId();	   
			res.send(orderHistory);	 
		} else {
			next({
				message: "Invalid Token"
			})
		}	  
	} catch (error) {
	   next(error);
   }
});

module.exports = orderHistoryRouter;