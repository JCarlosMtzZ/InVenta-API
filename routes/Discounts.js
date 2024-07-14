import express from 'express';

export const discountsRouter = express.Router();

discountsRouter.get('/', (req, res) => {
    res.send('Discounts');
});