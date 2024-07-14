import express from 'express';
import ProductsController from '../controllers/Products.js';

export const productsRouter = express.Router();

productsRouter.get('/', ProductsController.getProducts);
productsRouter.get('/:id', ProductsController.getProductById);
productsRouter.post('/', ProductsController.addProduct);
productsRouter.put('/:id', ProductsController.updateProduct);
productsRouter.delete('/:id', ProductsController.deleteProduct);