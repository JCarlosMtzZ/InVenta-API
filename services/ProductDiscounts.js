import { v4 as uuidv4 } from 'uuid';
import { ProductDiscounts } from '../models/ProductDiscounts.js';

export const getProductDiscounts = async () => {
    const productDiscounts = await ProductDiscounts.findAll();
    return productDiscounts;
};

export const getProductDiscountById = async (id) => {
    const productDiscount = await ProductDiscounts.findByPk(id);
    return productDiscount;
};

export const addProductDiscount = async (body) => {
    const id = uuidv4();
    const {
        productId,
        discountId
    } = body;
    const newProductDiscount = await ProductDiscounts.create({
        id,
        productId,
        discountId
    });
    return newProductDiscount;
};

export const updateProductDiscount = async (productDiscount, body) => {
    productDiscount.set(body);
    await productDiscount.save();
    return productDiscount;
};

export const deleteProductDiscount = async (id) => {
    await ProductDiscounts.destroy({
        where: { id }
    });
};