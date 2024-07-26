import express from 'express';
import CategoriesController from '../controllers/Categories.js';
import { validateCategory, validateCategoryUpdate } from '../middleware/validators/CategoriesValidators.js';
import { validateId } from '../middleware/validators/Common.js';

export const categoriesRouter = express.Router();

categoriesRouter.get('/', CategoriesController.getCategories);
categoriesRouter.get('/:id', validateId, CategoriesController.getCategoryById);
categoriesRouter.post('/', validateCategory, CategoriesController.addCategory);
categoriesRouter.put('/:id', [validateId, validateCategoryUpdate], CategoriesController.updateCategory);
categoriesRouter.delete('/:id', validateId, CategoriesController.deleteCategory);
