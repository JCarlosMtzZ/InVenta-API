import { v4 as uuidv4 } from 'uuid';
import { Discount } from '../models/Discount.js';

export const getDiscounts = async () => {
    const discounts = await Discount.findAll();
    return discounts;
};

export const getDiscountById = async (id) => {
    const discount = await Discount.findByPk(id);
    return discount;
};

export const addDiscount = async (body) => {
    const id = uuidv4();
    const {
        name,
        startDate,
        endDate,
        percentage,
        amount
    } = body;
    const newDiscount = await Discount.create({
        id,
        name,
        startDate,
        endDate,
        percentage,
        amount
    });
    return newDiscount;
};

export const updateDiscount = async (discount, body) => {
    discount.set(body);
    await discount.save();
    return discount;
};

export const deleteDiscount = async (id) => {
    await Discount.destroy({
        where: { id }
    });
};