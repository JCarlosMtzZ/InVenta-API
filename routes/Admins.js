import express from 'express';
import AdminsController from '../controllers/Admins.js';
import { validateAdmin, validateAdminId } from '../middleware/validators/AdminsValidators.js';

export const adminsRouter = express.Router();

adminsRouter.get('/', AdminsController.getAdmins);
adminsRouter.get('/:id', validateAdminId, AdminsController.getAdminById);
adminsRouter.post('/', validateAdmin, AdminsController.addAdmin);
adminsRouter.put('/:id', validateAdminId, AdminsController.updateAdmin);
adminsRouter.delete('/:id', validateAdminId, AdminsController.deleteAdmin);