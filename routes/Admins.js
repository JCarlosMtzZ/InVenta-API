import express from 'express';
import AdminsController from '../controllers/Admins.js';
import { 
    validateAdmin,
    validateAdminCredentials,
    validateAdminUpdate } from '../middleware/validators/AdminsValidators.js';
import { validateId } from '../middleware/validators/Common.js';

export const adminsRouter = express.Router();

adminsRouter.get('/', AdminsController.getAdmins);
adminsRouter.get('/:id', validateId, AdminsController.getAdminById);
adminsRouter.post('/', validateAdmin, AdminsController.addAdmin);
adminsRouter.put('/:id', [validateId, validateAdminUpdate], AdminsController.updateAdmin);
adminsRouter.delete('/:id', validateId, AdminsController.deleteAdmin);

adminsRouter.post('/signup', validateAdmin, AdminsController.signupPost);
adminsRouter.post('/login', validateAdminCredentials, AdminsController.loginPost);