import { body } from 'express-validator';
import { getValidationResults } from './Common.js';

export const validateDiscount = [
    body('name')
        .notEmpty().withMessage('Name is required'),
    body('startDate')
        .notEmpty().withMessage('Start Date is required')
        .isISO8601({ strict: true }).withMessage('Invalid Start Date format'),
    body('endDate')
        .notEmpty().withMessage('End Date is required')
        .isISO8601({ strict: true }).withMessage('Invalid End Date format'),
    body('percentage')
        .optional({ nullable: true })
        .isFloat({ gt: 0 }).withMessage('Percentage must be greater than 0')
        .isFloat({ lt: 1}).withMessage('Percentage must be less than 1'),
    body('amount')
        .optional({ nullable: true })
        .isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
    body().custom((req) => {
        if (!req.percentage && !req.amount) {
            throw new Error('Either Percentage or Amount must be provided');
        }
        return true;
    }),
    getValidationResults
];

export const validateDiscountUpdate = [
    body('name')
        .optional()
        .notEmpty().withMessage('Name is required'),
    body('startDate')
        .optional()
        .notEmpty().withMessage('Start Date is required')
        .isISO8601({ strict: true }).withMessage('Invalid Start Date format'),
    body('endDate')
        .optional()
        .notEmpty().withMessage('End Date is required')
        .isISO8601({ strict: true }).withMessage('Invalid End Date format'),
    body('percentage')
        .optional({ nullable: true })
        .isFloat({ gt: 0 }).withMessage('Percentage must be greater than 0')
        .isFloat({ lt: 1}).withMessage('Percentage must be less than 1'),
    body('amount')
        .optional({ nullable: true })
        .isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
    getValidationResults
];