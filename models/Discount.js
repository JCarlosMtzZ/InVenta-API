import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Discount = sequelize.define('Discount', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    percentage: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
}, {
    timestamps: false
});