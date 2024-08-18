import { Op, literal } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { OrderItem } from '../models/OrderItem.js';
import { Order } from '../models/Order.js';

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
        unitPrice,
        netUnitPrice,
        orderId,
        productId
    } = body;
    const newOrderItem = await OrderItem.create({
        id,
        quantity,
        unitPrice,
        netUnitPrice,
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

export const getOrderItemsSummaryByDateRange = async (startDate, endDate) => {
    const summary = await Order.findAll({
        attributes: [
            [literal('CAST(SUM("OrderItems"."quantity") AS INTEGER)'), 'totalUnits'],
            [literal('CAST(ROUND(CAST(SUM("OrderItems"."unitPrice") AS NUMERIC), 2) AS FLOAT)'), 'subtotal'],
            [literal('CAST(ROUND(CAST(SUM("OrderItems"."netUnitPrice") AS NUMERIC), 2) AS FLOAT)'), 'total']
        ],
        include: [{
            model: OrderItem,
            attributes: [],
        }],
        where: {
            date: {
                [Op.gte]: startDate,
                [Op.lte]: endDate
            }
        },
        raw: true        
    });
    return summary;
};

export const getOrderItemsMonthlySummariesByDateRange = async (startDate, endDate) => {
    const orders = await Order.findAll({
        attributes: [
            [literal("DATE_TRUNC('Month', \"date\") + INTERVAL '14 days'"), 'date'],
            [literal('CAST(SUM("OrderItems"."quantity") AS INTEGER)'), 'totalUnits'],
            [literal('CAST(ROUND(CAST(SUM("OrderItems"."unitPrice") AS NUMERIC), 2) AS FLOAT)'), 'subtotal'],
            [literal('CAST(ROUND(CAST(SUM("OrderItems"."netUnitPrice") AS NUMERIC), 2) AS FLOAT)'), 'total']
        ],
        include: [{
            model: OrderItem,
            attributes: []
        }],
        group: [literal("DATE_TRUNC('Month', \"date\") + INTERVAL '14 days'")],
        order: [literal("DATE_TRUNC('Month', \"date\") + INTERVAL '14 days'")],
        where: {
            date: {
                [Op.gte]: startDate,
                [Op.lte]: endDate
            }
        },
        raw: true
    });
    return orders;
};
