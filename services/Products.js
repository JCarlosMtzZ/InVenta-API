import { v4 as uuidv4 } from 'uuid';
import { Op, fn, col, literal, QueryTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { Product } from '../models/Product.js';
import { Image } from '../models/Image.js';
import { Discount } from '../models/Discount.js';
import { ProductDiscounts } from '../models/ProductDiscounts.js';
import { Category } from '../models/Category.js';
import { Order } from '../models/Order.js';
import { OrderItem } from '../models/OrderItem.js';

export const getProducts = async () => {
    const products = await Product.findAll();
    return products;
};

export const getProductsByNameFilter = async (name) => {
    const products = await Product.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.iLike]: `%${name}%` } },
                { description: { [Op.iLike]: `%${name}%` }}
            ]
        },
        limit: 10
    });
    return products;
};

export const getProductById = async (id) => {
    const product = await Product.findByPk(id);
    return product;
};

export const addProduct = async (body) => {
    const id = uuidv4();
    const status = true;
    const {
        name,
        unitPrice,
        description,
        size,
        stock,
        brand,
        categoryId
    } = body;
    const newProduct = await Product.create({
        id,
        name,
        unitPrice,
        description,
        size,
        stock,
        status,
        brand,
        categoryId,
        status
    });
    return newProduct;
};

export const updateProduct = async (product, body) => {
    product.set(body);
    await product.save();
    return product;
};

export const deleteProduct = async (id) => {
    await Product.destroy({
        where: { id }
    });
};

export const getProductsCategoryImagesDiscounts = async () => {
    const products = await Product.findAll({
        order: [['name', 'ASC']],
        include: [{
            model: Category,
            required: true
        },
        {
            model: Image,
            required: false,
            attributes: { exclude: ['productId'] }
        },
        {
            model: Discount,
            through: { model: ProductDiscounts },
            required: false,
            where: {
                startDate: { [Op.lte]: new Date() },
                endDate: { [Op.gte]: new Date() }
            }
        }]
    });
    return products;
};

export const getProductsCategoryImagesDiscountsByNameFilter = async (name) => {
    const products = await Product.findAll({
        order: [['name', 'ASC']],
        where: {
            [Op.or]: [
                { name: { [Op.iLike]: `%${name}%` } },
                { description: { [Op.iLike]: `%${name}%` }}
            ]
        },
        limit: 10,
        include: [{
            model: Category,
            required: true
        },
        {
            model: Image,
            required: false,
            attributes: { exclude: ['productId'] }
        },
        {
            model: Discount,
            through: { model: ProductDiscounts },
            required: false,
            where: {
                startDate: { [Op.lte]: new Date() },
                endDate: { [Op.gte]: new Date() }
            }
        },
        ]
    });
    return products;
};

export const getProductsCategoryImagesWithDiscounts = async () => {
    const products = await Product.findAll({
        order: [['name', 'ASC']],
        limit: 10,
        include: [{
            model: Category,
            required: true
        },
        {
            model: Image,
            required: false,
            attributes: { exclude: ['productId'] }
        },
        {
            model: Discount,
            through: { model: ProductDiscounts },
            required: true,
            where: {
                startDate: { [Op.lte]: new Date() },
                endDate: { [Op.gte]: new Date() }
            }
        },
        ]
    });
    return products;
};

export const getProductsCategoryImagesByNameAndDiscountsFilter = async (name) => {
    const products = await Product.findAll({
        order: [['name', 'ASC']],
        where: {
            [Op.or]: [
                { name: { [Op.iLike]: `%${name}%` } },
                { description: { [Op.iLike]: `%${name}%` }}
            ]
        },
        limit: 10,
        include: [{
            model: Category,
            required: true
        },
        {
            model: Image,
            required: false,
            attributes: { exclude: ['productId'] }
        },
        {
            model: Discount,
            through: { model: ProductDiscounts },
            required: true,
            where: {
                startDate: { [Op.lte]: new Date() },
                endDate: { [Op.gte]: new Date() }
            }
        },
        ]
    });
    return products;
};

export const getProductsCategoryImagesDiscountsByCategory = async (categoryId) => {
    const products = await Product.findAll({
        order: [['name', 'ASC']],
        where: { categoryId: categoryId },
        limit: 10,
        include: [{
            model: Category,
            required: true
        },
        {
            model: Image,
            required: false,
            attributes: { exclude: ['productId'] }
        },
        {
            model: Discount,
            through: { model: ProductDiscounts },
            required: false,
            where: {
                startDate: { [Op.lte]: new Date() },
                endDate: { [Op.gte]: new Date() }
            }
        },
        ]
    });
    return products;
};

export const getProductsCategoryImagesDiscountsByNameAndCategoryIdFilter = async (name, categoryId) => {
    const products = await Product.findAll({
        order: [['name', 'ASC']],
        where: {
            [Op.and]: [
                {
                    [Op.or]: [
                        { name: { [Op.iLike]: `%${name}%` } },
                        { description: { [Op.iLike]: `%${name}%` }}
                    ]

                },
                {
                    categoryId: categoryId
                }
            ]
            
        },
        limit: 10,
        include: [{
            model: Category,
            required: true
        },
        {
            model: Image,
            required: false,
            attributes: { exclude: ['productId'] }
        },
        {
            model: Discount,
            through: { model: ProductDiscounts },
            required: false,
            where: {
                startDate: { [Op.lte]: new Date() },
                endDate: { [Op.gte]: new Date() }
            }
        },
        ]
    });
    return products;
};

export const getProductCategoryImagesDiscountsById = async (id) => {
    const products = await Product.findOne({
        where: { id: id },
        include: [{
            model: Category,
            required: true
        },
        {
            model: Image,
            required: false,
            attributes: { exclude: ['productId'] }
        },
        {
            model: Discount,
            through: { model: ProductDiscounts },
            required: false,
            where: {
                startDate: { [Op.lte]: new Date() },
                endDate: { [Op.gte]: new Date() }
            }
        }]
    });
    return products;
};

export const getTopProductsByDateRange = async (limit, order, startDate, endDate) => {
    const products = await Order.findAll({
        attributes: [
            [col('OrderItems.Product.id'), 'productId'],
            [col('OrderItems.Product.name'), 'productName'],
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
                required: true
            }],
        }],
        group: [
            'OrderItems.Product.id', 'OrderItems.Product.name'
        ],
        order: [
            [literal('CAST(SUM("OrderItems"."quantity") AS INTEGER)'), order],
        ],
        where: {
            date: {
                [Op.gte]: startDate,
                [Op.lte]: endDate
            }
        },
        raw: true
    });
    if (products && products.length >= limit)
        return products.slice(0, limit);
    return products;
};

