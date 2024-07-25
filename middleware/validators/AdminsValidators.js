import { body } from 'express-validator';
import { getValidationResults } from './Common.js';

export const validateAdmin = [
    body('firstName')
        .notEmpty().withMessage('First Name is required'),
    body('lastName')
        .notEmpty().withMessage('Last Name is required'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid Email format'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number')
        .matches(/[\W_]/).withMessage('Password must contain at least one symbol'),
    getValidationResults
];

export const validateAdminCredentials = [
    body('email')
        .notEmpty().withMessage('Email is required'),
    body('password')
        .notEmpty().withMessage('Password is required'),
    getValidationResults
];

export const validateAdminUpdate = [
    body('firstName')
        .optional()
        .notEmpty().withMessage('First Name is required'),
    body('lastName')
        .optional()
        .notEmpty().withMessage('Last Name is required'),
    body('email')
        .optional()
        .isEmail().withMessage('Invalid Email format'),
    body('password')
        .optional()
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number')
        .matches(/[\W_]/).withMessage('Password must contain at least one symbol'),
    getValidationResults
];