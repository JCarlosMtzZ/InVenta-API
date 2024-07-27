import express from 'express';
import ProductsController from '../controllers/Products.js';
import { validateProduct, validateProductUpdate } from '../middleware/validators/ProductsValidators.js';
import { validateId } from '../middleware/validators/Common.js';

export const productsRouter = express.Router();

productsRouter.get('/', ProductsController.getProducts);
productsRouter.get('/:id', validateId, ProductsController.getProductById);
productsRouter.post('/', validateProduct, ProductsController.addProduct);
productsRouter.put('/:id', [validateId, validateProductUpdate], ProductsController.updateProduct);
productsRouter.delete('/:id', validateId, ProductsController.deleteProduct);

productsRouter.get('/category/images/discounts', ProductsController.getProductsCategoryImagesDiscounts);
productsRouter.get('/category/images/discounts/:id', validateId, ProductsController.getProductCategoryImagesDiscountsById);