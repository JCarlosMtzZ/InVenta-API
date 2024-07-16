import {
    body,
    validationResult
} from 'express-validator';

export const validateOrderItem = [
    body('quantity')
        .notEmpty().withMessage('Quantity is required')
        .isInt({ gt: 0 }).withMessage('Quantity must be greater than 0'),
    body('orderId')
        .notEmpty().withMessage('Order Id is required')
        .isUUID().withMessage('Invalid UUID format'),
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