import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { Order } from './Order.js';

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
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    timestamps: false
});

Admin.hasMany(Order, {
    foreignKey: 'adminId',
    sourceKey: 'id'
});

Order.belongsTo(Admin, {
    foreignKey: 'adminId',
    targetKey: 'id'
});