import { body } from 'express-validator';
import { getValidationResults } from './Common.js';

export const validateCategory = [
    body('name')
        .notEmpty().withMessage('Name is required'),
    getValidationResults
];

export const validateCategoryUpdate = [
    body('name')
        .notEmpty().withMessage('Name is required'),
    getValidationResults
];