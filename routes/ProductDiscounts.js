import express from 'express';

export const productDiscountsRouter = express.Router();

productDiscountsRouter.get('/', (req, res) => {
    res.send('Product Discounts');
});