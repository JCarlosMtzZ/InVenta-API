import express from 'express';
import OrdersController from '../controllers/Orders.js';
import { validateOrder } from '../middleware/validators/OrdersValidators.js';
import { validateId } from '../middleware/validators/Common.js';

export const ordersRouter = express.Router();

ordersRouter.get('/', OrdersController.getOrders);
ordersRouter.get('/:id', validateId, OrdersController.getOrderById);
ordersRouter.post('/', validateOrder, OrdersController.addOrder);
ordersRouter.put('/:id', validateId, OrdersController.updateOrder);
ordersRouter.delete('/:id', validateId, OrdersController.deleteOrder);