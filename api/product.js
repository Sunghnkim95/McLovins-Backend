const express = require('express');
const productRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const {
    getProductById,
    createProduct,
    getAllProducts, 
    updateProduct,
    getProductByName,
    deleteProduct,
    getProductByCategory
} = require('../db')

productRouter.use((req, res, next) => {
    next(); 
});

productRouter.get('/', async (req, res, next) => {
	try {
		const products = await getAllProducts();	
		res.send(products);	  
	} catch (error) {
		next(error);
	}
});

productRouter.post('/', async (req, res, next) => {
	try {
		const newProduct = await createProduct(req.body);
		res.send(newProduct);
	} catch (error) {
		next(error);
	}
});

productRouter.patch('/:productId', async (req, res, next) => {
	try {
		const productId = req.params.productId;
		const { name, description, quantity, price, category, photo} = req.body;
		const passing = {
			id: productId, 
			name: name, 
			description: description,
            quantity: quantity,
            price: price,
            category: category,
            photo: photo
        };
		const updatedProduct = await updateProduct(passing);

		res.send(updatedProduct);
	} catch (error) {
		next(error);
	}
});

productRouter.delete('/:productId', async (req, res, next) => {
	try {
		const { productId } = req.params.id;
		console.log('HOOHOHOHOHO PARAMS', req.params);
		console.log('HOOHOHOHOHO BODY SHOT', req.body);

		const prefix = 'Bearer ';
		const auth = req.header('Authorization');
		const token = auth?auth.slice(prefix.length):null;
		const { id } = jwt.verify(token, JWT_SECRET);
		console.log('HEY OVER HERE', id, admin);
		console.log('HEY OVER HERE2', productId);

        if(admin){
			const deleteProduct = await deleteProduct(productId);
			res.send(deleteProduct);
		}

	} catch(error) {
		next(error);
	}
});

productRouter.get('/:productId', async (req, res, next) => {
	try {
		const { productId } = req.params;
		const activity = await getProductById(productId);
		
        res.send(activity)

	} catch(error) {
		next(error);
	}
});

module.exports = productRouter;



