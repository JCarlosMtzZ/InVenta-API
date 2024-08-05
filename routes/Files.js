import express from 'express';
import FilesController from '../controllers/Files.js';
import { validateFiles } from '../middleware/validators/FilesValidators.js';
import { handleMulterErrors } from '../middleware/multer/errorHandler.js';
import { upload } from '../middleware/multer/config.js';

export const filesRouter = express.Router();

filesRouter.get('/:prefix', FilesController.getFilesByPrefix);
filesRouter.post('/', upload.array('files', 5), handleMulterErrors, validateFiles, FilesController.addProductFiles);
filesRouter.delete('/:name', FilesController.deleteFile);