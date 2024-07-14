import express from 'express';
import { adminsRouter } from './Admins.js';
import { discountsRouter } from './Discounts.js';
import { imagesRouter } from './Images.js';
import { orderItemsRouter } from './OrderItems.js';
import { ordersRouter } from './Orders.js';
import { productDiscountsRouter } from './ProductDiscounts.js';
import { productsRouter } from './Products.js';

export const router = express.Router();

router.use('/admins', adminsRouter);
router.use('/discounts', discountsRouter);
router.use('/images', imagesRouter);
router.use('/orderItems', orderItemsRouter);
router.use('/orders', ordersRouter);
router.use('/productDiscounts', productDiscountsRouter);
router.use('/products', productsRouter);