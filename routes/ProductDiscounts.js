import express from 'express';
import ProductDiscountsController from '../controllers/ProductDiscounts.js';
import { validateProductDiscount } from '../middleware/validators/ProductDiscountsValidators.js';
import { validateId } from '../middleware/validators/Common.js';

export const productDiscountsRouter = express.Router();

productDiscountsRouter.get('/', ProductDiscountsController.getProductDiscounts);
productDiscountsRouter.get('/:id', validateId, ProductDiscountsController.getProductDiscountById);
productDiscountsRouter.post('/', validateProductDiscount, ProductDiscountsController.addProductDiscount);
productDiscountsRouter.put('/:id', validateId, ProductDiscountsController.updateProductDiscount);
productDiscountsRouter.delete('/:id', validateId, ProductDiscountsController.deleteProductDiscount);