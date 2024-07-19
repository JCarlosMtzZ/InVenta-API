import express from 'express';
import ProductsController from '../controllers/Products.js';
import { validateProduct } from '../middleware/validators/ProductsValidators.js';
import { validateId } from '../middleware/validators/Common.js';

export const productsRouter = express.Router();

productsRouter.get('/', ProductsController.getProducts);
productsRouter.get('/:id', validateId, ProductsController.getProductById);
productsRouter.post('/', validateProduct, ProductsController.addProduct);
productsRouter.put('/:id', validateId, ProductsController.updateProduct);
productsRouter.delete('/:id', validateId, ProductsController.deleteProduct);

productsRouter.get('/images/discounts', ProductsController.getProductsImagesDiscounts);