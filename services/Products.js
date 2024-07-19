import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { Product } from '../models/Product.js';
import { Image } from '../models/Image.js';
import { Discount } from '../models/Discount.js';
import { ProductDiscounts } from '../models/ProductDiscounts.js';

export const getProducts = async () => {
    const products = await Product.findAll();
    return products;
};

export const getProductById = async (id) => {
    const product = await Product.findByPk(id);
    return product;
};

export const addProduct = async (body) => {
    const id = uuidv4();
    const {
        name,
        unitPrice,
        description,
        size,
        stock,
        status,
        brand
    } = body;
    const newProduct = await Product.create({
        id,
        name,
        unitPrice,
        description,
        size,
        stock,
        status,
        brand
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

export const getProductsImagesDiscounts = async () => {
    const products = await Product.findAll({
        include: [{
            model: Image,
            required: true,
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