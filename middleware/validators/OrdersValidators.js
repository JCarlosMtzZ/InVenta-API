import {
    body,
    validationResult
} from 'express-validator';

export const validateOrder = [
    body('date')
        .notEmpty().withMessage('Date is required')
        .isISO8601({ strict: true }).withMessage('Invalid Date format'),
    body('adminId')
        .notEmpty().withMessage('Admin Id is required')
        .isUUID().withMessage('Invalid UUID format'),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];