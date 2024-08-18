import { v4 as uuidv4 } from 'uuid';
import { Order } from '../models/Order.js';

export const getOrders = async () => {
    const orders = await Order.findAll();
    return orders;
};

export const getOrderById = async (id) => {
    const order = await Order.findByPk(id);
    return order;
};

export const addOrder = async (body) => {
    const id = uuidv4();
    const {
        date,
        adminId
    } = body;
    const newOrder = await Order.create({
        id,
        date,
        adminId
    });
    return newOrder;
};

export const updateOrder = async (order, body) => {
    order.set(body);
    await order.save();
    return order;
};

export const deleteOrder = async (id) => {
    await Order.destroy({
        where: { id }
    });
};
