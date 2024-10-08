import express from 'express';
import OrderItemsController from '../controllers/OrderItems.js';
import { validateOrderItem, validateOrderItemUpdate } from '../middleware/validators/OrderItemsValidators.js';
import { validateId } from '../middleware/validators/Common.js';

export const orderItemsRouter = express.Router();

orderItemsRouter.get('/', OrderItemsController.getOrderItems);

orderItemsRouter.get('/summary', OrderItemsController.getOrderItemsSummaryByDateRange);
orderItemsRouter.get('/monthlySummaries', OrderItemsController.getOrderItemsMonthlySummariesByDateRange);

orderItemsRouter.get('/:id', validateId, OrderItemsController.getOrderItemById);
orderItemsRouter.post('/', validateOrderItem, OrderItemsController.addOrderItem);
orderItemsRouter.put('/:id', [validateId, validateOrderItemUpdate], OrderItemsController.updateOrderItem);
orderItemsRouter.delete('/:id', validateId, OrderItemsController.deleteOrderItem);
