import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { Order } from './Order.js';
import bcrypt from 'bcrypt';

export const Admin = sequelize.define('Admin', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    timestamps: false
});

Admin.beforeCreate(async (admin, options) => {
    const salt = await bcrypt.genSalt();
    admin.password = await bcrypt.hash(admin.password, salt);
});

Admin.beforeUpdate(async (admin, options) => {
    if (admin.password) {
        const salt = await bcrypt.genSalt();
        admin.password = await bcrypt.hash(admin.password, salt);
    }
});

Admin.hasMany(Order, {
    foreignKey: 'adminId',
    sourceKey: 'id'
});

Order.belongsTo(Admin, {
    foreignKey: 'adminId',
    targetKey: 'id'
});