import { Op, col, literal } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '../models/Category.js';
import { Order } from '../models/Order.js';
import { OrderItem } from '../models/OrderItem.js';
import { Product } from '../models/Product.js';

export const getCategories = async () => {
    const categories = await Category.findAll();
    return categories;
};

export const getCategoryById = async (id) => {
    const category = await Category.findByPk(id);
    return category;
};

export const addCategory = async (body) => {
    const id = uuidv4();
    const {
        name
    } = body;
    const newCategory = await Category.create({
        id,
        name
    });
    return newCategory;
};

export const updateCategory = async (category, body) => {
    category.set(body);
    await category.save();
    return category;
};

export const deleteCategory = async (id) => {
    await Category.destroy({
        where: { id }
    });
};

export const getCategoriesSummariesByDateRange = async (startDate, endDate) => {
    const summaries = await Order.findAll({
        attributes: [
            [col('OrderItems.Product.Category.id'), 'categoryId'],
            [col('OrderItems.Product.Category.name'), 'categoryName'],
            [literal('CAST(SUM("OrderItems"."quantity") AS INTEGER)'), 'totalUnits'],
            [literal('CAST(ROUND(CAST(SUM("OrderItems"."unitPrice") AS NUMERIC), 2) AS FLOAT)'), 'subtotal'],
            [literal('CAST(ROUND(CAST(SUM("OrderItems"."netUnitPrice") AS NUMERIC), 2) AS FLOAT)'), 'total']
        ],
        include: [{
            model: OrderItem,
            attributes: [],
            include: [{
                model: Product,
                attributes: [],
                include: [{
                    model: Category,
                    attributes: []
                }]
            }]
        }],
        group: [
            'OrderItems.Product.Category.id', 'OrderItems.Product.Category.name'
        ],
        order: [
            [col('OrderItems.Product.Category.name'), 'ASC']
        ],
        where: {
            date: {
                [Op.gte]: startDate,
                [Op.lte]: endDate
            }
        },
        raw: true,
    });
    return summaries;
};