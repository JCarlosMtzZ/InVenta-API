import express from 'express';

export const orderItemsRouter = express.Router();

orderItemsRouter.get('/', (req, res) => {
    res.send('Order Items');
});