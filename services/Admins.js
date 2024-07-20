import { v4 as uuidv4 } from 'uuid';
import { Admin } from '../models/Admin.js';

export const getAdmins = async () => {
    const admins = await Admin.findAll({
        attributes: { exclude: ['password'] }
    }
    );
    return admins;
};

export const getAdminById = async (id) => {
    const admin = await Admin.findByPk(id, {
        attributes: { exclude: ['password'] }
    });
    return admin;
};

export const addAdmin = async (body) => {
    const id = uuidv4();
    const {
        firstName,
        lastName,
        email,
        password
    } = body;
    const newAdmin = await Admin.create({
        id,
        firstName,
        lastName,
        email,
        password
    });
    return newAdmin;
};

export const updateAdmin = async (admin, body) => {
    admin.set(body);
    await admin.save();
    return admin;
};

export const deleteAdmin = async (id) => {
    await Admin.destroy({
        where: { id }
    });
};