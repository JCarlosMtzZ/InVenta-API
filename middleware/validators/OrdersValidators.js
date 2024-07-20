import { body } from 'express-validator';
import { getValidationResults } from './Common.js';

export const validateOrder = [
    body('date')
        .notEmpty().withMessage('Date is required')
        .isISO8601({ strict: true }).withMessage('Invalid Date format'),
    body('adminId')
        .notEmpty().withMessage('Admin Id is required')
        .isUUID().withMessage('Invalid UUID format'),
    getValidationResults
];

export const validateOrderUpdate = [
    body('date')
        .optional()
        .notEmpty().withMessage('Date is required')
        .isISO8601({ strict: true }).withMessage('Invalid Date format'),
    body('adminId')
        .optional()
        .notEmpty().withMessage('Admin Id is required')
        .isUUID().withMessage('Invalid UUID format'),
    getValidationResults
];