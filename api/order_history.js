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
		const newOrderHistory = await createOrderHistory(req.body);
		res.send(newOrderHistory);

	} catch (error) {
		next(error);
	}
});

orderHistoryRouter.get('/', async (req, res, next) => {
	try {
	   const orderHistory = await getOrderHistoryByUserId();	   
	   res.send(orderHistory);	   
	} catch (error) {
	   next(error);
   }
});

module.exports = orderHistoryRouter;