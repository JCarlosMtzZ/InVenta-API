import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { OrderItem } from './OrderItem.js';

export const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    adminId: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    timestamps: false
});

Order.hasMany(OrderItem, {
    foreignKey: 'orderId',
    sourceKey: 'id'
});

OrderItem.belongsTo(Order, {
    foreignKey: 'orderId',
    targetKey: 'id'
});