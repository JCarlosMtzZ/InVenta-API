import { v4 as uuidv4 } from 'uuid';
import { Op, col, literal } from 'sequelize';
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

export const getProductsCategoryImagesByNameAndFilter = async (page, limit, name, filter) => {
    const offset = (page - 1) * limit;
    
    const queryObject = {
        distinct: true,
        col: 'id',
        order: [['name', 'ASC']],
        where: {
            [Op.and]: [
                name && {
                    [Op.or]: [
                        { name: { [Op.iLike]: `%${name}%` } },
                        { description: { [Op.iLike]: `%${name}%` }}
                    ]

                },
                filter && filter !== 'discounts' && {
                    categoryId: filter
                }
            ]
            
        },
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
            required: filter === 'discounts',
            where: {
                startDate: { [Op.lte]: new Date() },
                endDate: { [Op.gte]: new Date() }
            }
        }]
    };

    const count = await Product.count(queryObject);

    queryObject.limit = limit;
    queryObject.offset = offset;
    
    const products = await Product.findAll(queryObject);
    return {
        page: page,
        pageSize: limit,
        totalPages: Math.ceil(count / limit),
        totalProducts: count,
        products: products
    };
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
            [literal('CAST(ROUND(CAST(SUM("OrderItems"."unitPrice" * "OrderItems"."quantity") AS NUMERIC), 2) AS FLOAT)'), 'subtotal'],
            [literal('CAST(ROUND(CAST(SUM("OrderItems"."netUnitPrice" * "OrderItems"."quantity") AS NUMERIC), 2) AS FLOAT)'), 'total']
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

