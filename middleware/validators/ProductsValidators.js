import {
    body,
    validationResult
} from 'express-validator';

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
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];