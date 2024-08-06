import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { Product } from '../models/Product.js';
import { Image } from '../models/Image.js';
import { Discount } from '../models/Discount.js';
import { ProductDiscounts } from '../models/ProductDiscounts.js';
import { Category } from '../models/Category.js';

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