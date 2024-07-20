import { body } from 'express-validator';
import { getValidationResults } from './Common.js';

export const validateImage = [
    body('url')
        .notEmpty().withMessage('URL is required'),
    body('productId')
        .notEmpty().withMessage('Product Id is required')
        .isUUID().withMessage('Invalid UUID format'),
    getValidationResults
];

export const validateImageUpdate = [
    body('url')
        .optional()
        .notEmpty().withMessage('URL is required'),
    body('productId')
        .optional()
        .notEmpty().withMessage('Product Id is required')
        .isUUID().withMessage('Invalid UUID format'),
    getValidationResults
];