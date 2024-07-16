import { v4 as uuidv4 } from 'uuid';
import { OrderItem } from '../models/OrderItem.js';

export const getOrderItems = async () => {
    const orderItems = await OrderItem.findAll();
    return orderItems;
};

export const getOrderItemById = async (id) => {
    const orderItem = await OrderItem.findByPk(id);
    return orderItem;
};

export const addOrderItem = async (body) => {
    const id = uuidv4();
    const {
        quantity,
        orderId,
        productId
    } = body;
    const newOrderItem = await OrderItem.create({
        id,
        quantity,
        orderId,
        productId
    });
    return newOrderItem;
};

export const updateOrderItem = async (orderItem, body) => {
    orderItem.set(body);
    await orderItem.save();
    return orderItem;
};

export const deleteOrderItem = async (id) => {
    await OrderItem.destroy({
        where: { id }
    });
};