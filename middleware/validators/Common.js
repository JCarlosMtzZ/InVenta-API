import {
    param,
    validationResult
} from 'express-validator';
import { cleanupFiles } from '../multer/util.js';

export const getValidationResults = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if (req.files)
            cleanupFiles(req.files);
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const validateId = [
    param('id').isUUID().withMessage('Invalid UUID format'),
    getValidationResults
];

