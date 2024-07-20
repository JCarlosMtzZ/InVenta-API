import {
    param,
    validationResult
} from 'express-validator';

export const getValidationResults = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const validateId = [
    param('id').isUUID().withMessage('Invalid UUID format'),
    getValidationResults
];

