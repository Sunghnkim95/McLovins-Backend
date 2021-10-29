const express = require('express');
const orderHistoryRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const {
    getOrderHistoryByUserId,
    createOrderHistory,
} = require('../db')

orderHistoryRouter.use((req, res, next) => {
    console.log("A request is being made to /order_history");
    next(); 
});

orderHistoryRouter.post('/order_history', async (req, res, next) => {
	try {
		const prefix = 'Bearer ';
		const auth = req.header('Authorization');
		const token = auth?auth.slice(prefix.length):null;
		const { id } = jwt.verify(token, JWT_SECRET);
		const { userId } = req.body

		if (id === userId){
			const newOrderHistory = await createOrderHistory(req.body);
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

orderHistoryRouter.get('/userId/:userId', async (req, res, next) => {
	try {
		const prefix = 'Bearer ';
		const auth = req.header('Authorization');
		const token = auth?auth.slice(prefix.length):null;
		const { id } = jwt.verify(token, JWT_SECRET);
		const { userId } = req.params;

		if (id === userId){
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