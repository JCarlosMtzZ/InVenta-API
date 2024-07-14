import { v4 as uuidv4 } from 'uuid';
import { Product } from '../models/Product.js';

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

export const updateProduct = async (req) => {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    product.set(req.body);
    await product.save();
    return product;
};

export const deleteProduct = async (id) => {
    const success = await Product.destroy({
        where: { id }
    });
    if (success) return true;
    return false;
};