import { body } from 'express-validator';
import { getValidationResults } from './Common.js';

export const validateFiles = [
    body('prefix')
        .notEmpty().withMessage('Prefix is required'),
    body('files').custom((value, { req }) => {
        if (!req.files || req.files.length === 0)
            throw new Error('Files are required')
        return true;
    }),
    getValidationResults
];