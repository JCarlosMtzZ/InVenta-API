import { body } from 'express-validator';
import { getValidationResults } from './Common.js';

export const validateProduct = [
    body('name')
        .notEmpty().withMessage('Name is required'),
    body('unitPrice')
        .notEmpty().withMessage('Unit Price is required')
        .isFloat({ gt: 0 }).withMessage('Unit Price must be greater than 0'),
    body('description')
        .notEmpty().withMessage('Description is required'),
    body('size')
        .notEmpty().withMessage('Size is required'),
    body('stock')
        .notEmpty().withMessage('Stock is required'),
    getValidationResults
];

export const validateProductUpdate = [
    body('name')
        .optional()
        .notEmpty().withMessage('Name is required'),
    body('unitPrice')
        .optional()
        .notEmpty().withMessage('Unit Price is required')
        .isFloat({ gt: 0 }).withMessage('Unit Price must be greater than 0'),
    body('description')
        .optional()
        .notEmpty().withMessage('Description is required'),
    body('size')
        .optional()
        .notEmpty().withMessage('Size is required'),
    body('stock')
        .optional()
        .notEmpty().withMessage('Stock is required'),
    getValidationResults
];