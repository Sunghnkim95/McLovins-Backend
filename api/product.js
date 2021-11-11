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
		const { productId } = req.params;
		const prefix = 'Bearer ';
		const auth = req.header('Authorization');
		const token = auth?auth.slice(prefix.length):null;
		const { admin } = jwt.verify(token, JWT_SECRET);

        if(admin){
			const deletedProduct = await deleteProduct(productId);
			console.log('deleteProduct123123', deletedProduct);
			res.send(deletedProduct);
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



