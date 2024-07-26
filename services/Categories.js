import { v4 as uuidv4 } from 'uuid';
import { Category } from '../models/Category.js';

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