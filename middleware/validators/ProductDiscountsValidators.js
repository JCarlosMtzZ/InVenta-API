import { body } from 'express-validator';
import { getValidationResults } from './Common.js';

export const validateProductDiscount = [
    body('productId')
        .notEmpty().withMessage('Product Id is required')
        .isUUID().withMessage('Invalid UUID format'),
    body('discountId')
        .notEmpty().withMessage('Discount Id is required')
        .isUUID().withMessage('Invalid UUID format'),
    getValidationResults
];

export const validateProductDiscountUpdate = [
    body('productId')
        .optional()
        .notEmpty().withMessage('Product Id is required')
        .isUUID().withMessage('Invalid UUID format'),
    body('discountId')
        .optional()
        .notEmpty().withMessage('Discount Id is required')
        .isUUID().withMessage('Invalid UUID format'),
    getValidationResults
];