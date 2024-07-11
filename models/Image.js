import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Image = sequelize.define('Image', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    url: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    productId: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    timestamps: false
});