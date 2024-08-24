import express from 'express';
import OrdersController from '../controllers/Orders.js';
import { validateOrder, validateOrderUpdate } from '../middleware/validators/OrdersValidators.js';
import { validateId } from '../middleware/validators/Common.js';

export const ordersRouter = express.Router();

ordersRouter.get('/', OrdersController.getOrders);

ordersRouter.get('/dateRange', OrdersController.getOrdersDateRange);

ordersRouter.get('/:id', validateId, OrdersController.getOrderById);
ordersRouter.post('/', validateOrder, OrdersController.addOrder);
ordersRouter.put('/:id', [validateId, validateOrderUpdate], OrdersController.updateOrder);
ordersRouter.delete('/:id', validateId, OrdersController.deleteOrder);