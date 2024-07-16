import {
    body,
    validationResult
} from 'express-validator';

export const validateImage = [
    body('url')
        .notEmpty().withMessage('URL is required'),
    body('productId')
        .notEmpty().withMessage('Product Id is required')
        .isUUID().withMessage('Invalid UUID format'),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];