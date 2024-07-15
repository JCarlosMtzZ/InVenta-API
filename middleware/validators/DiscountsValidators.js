import {
    body,
    validationResult
} from 'express-validator';

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
        .optional()
        .isFloat({ gt: 0 }).withMessage('Percentage must be greater than 0')
        .isFloat({ lt: 1}).withMessage('Percentage must be less than 1'),
    body('amount')
        .optional()
        .isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
    body().custom((req) => {
        if (!req.percentage && !req.amount) {
            throw new Error('Either Percentage or Amount must be provided');
        }
        return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];