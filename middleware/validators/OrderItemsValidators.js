import { body } from 'express-validator';
import { getValidationResults } from './Common.js';

export const validateOrderItem = [
    body('quantity')
        .notEmpty().withMessage('Quantity is required')
        .isInt({ gt: 0 }).withMessage('Quantity must be greater than 0'),
    body('unitPrice')
        .notEmpty().withMessage('Unit price is required')
        .isFloat({ gt: 0 }).withMessage('Unit price must be greater than 0'),
    body('netUnitPrice')
        .notEmpty().withMessage('Net unit price is required')
        .isFloat({ gt: 0 }).withMessage('Net unit price must be greater than 0'),
    body('orderId')
        .notEmpty().withMessage('Order Id is required')
        .isUUID().withMessage('Invalid UUID format'),
    body('productId')
        .notEmpty().withMessage('Product Id is required')
        .isUUID().withMessage('Invalid UUID format'),
    getValidationResults
];

export const validateOrderItemUpdate = [
    body('quantity')
        .optional()
        .notEmpty().withMessage('Quantity is required')
        .isInt({ gt: 0 }).withMessage('Quantity must be greater than 0'),
    body('unitPrice')
        .optional()
        .notEmpty().withMessage('Unit price is required')
        .isFloat({ gt: 0 }).withMessage('Unit price must be greater than 0'),
    body('netUnitPrice')
        .notEmpty().withMessage('Net unit price is required')
        .isFloat({ gt: 0 }).withMessage('Net unit price must be greater than 0'),
    body('orderId')
        .optional()
        .notEmpty().withMessage('Order Id is required')
        .isUUID().withMessage('Invalid UUID format'),
    body('productId')
        .optional()
        .notEmpty().withMessage('Product Id is required')
        .isUUID().withMessage('Invalid UUID format'),
    getValidationResults
];