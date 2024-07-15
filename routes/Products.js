import express from 'express';
import ProductsController from '../controllers/Products.js';
import { validateProduct, validateProductId } from '../middleware/validators/ProductsValidators.js';

export const productsRouter = express.Router();

productsRouter.get('/', ProductsController.getProducts);
productsRouter.get('/:id', validateProductId, ProductsController.getProductById);
productsRouter.post('/', validateProduct, ProductsController.addProduct);
productsRouter.put('/:id', validateProductId, ProductsController.updateProduct);
productsRouter.delete('/:id', validateProductId, ProductsController.deleteProduct);