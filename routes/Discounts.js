import express from 'express';
import DiscountsController from '../controllers/Discounts.js';
import { validateDiscount, validateDiscountUpdate } from '../middleware/validators/DiscountsValidators.js';
import { validateId } from '../middleware/validators/Common.js';

export const discountsRouter = express.Router();

discountsRouter.get('/', DiscountsController.getDiscounts);
discountsRouter.get('/:id', validateId, DiscountsController.getDiscountById);
discountsRouter.post('/', validateDiscount, DiscountsController.addDiscount);
discountsRouter.put('/:id', [validateId, validateDiscountUpdate], DiscountsController.updateDiscount);
discountsRouter.delete('/:id', validateId, DiscountsController.deleteDiscount);