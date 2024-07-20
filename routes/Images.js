import express from 'express';
import ImagesController from '../controllers/Images.js';
import { validateImage, validateImageUpdate } from '../middleware/validators/ImagesValidators.js';
import { validateId } from '../middleware/validators/Common.js';

export const imagesRouter = express.Router();

imagesRouter.get('/', ImagesController.getImages);
imagesRouter.get('/:id', validateId, ImagesController.getImageById);
imagesRouter.post('/', validateImage, ImagesController.addImage);
imagesRouter.put('/:id', [validateId, validateImageUpdate], ImagesController.updateImage);
imagesRouter.delete('/:id', validateId, ImagesController.deleteImage);