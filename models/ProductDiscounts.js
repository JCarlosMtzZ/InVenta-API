import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { Product } from './Product.js';
import { Discount } from './Discount.js';

export const ProductDiscounts = sequelize.define('ProductDiscounts', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    productId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    discountId: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    timestamps: false
});

Product.belongsToMany(Discount, {
    through: ProductDiscounts,
    foreignKey: 'productId',
    otherKey: 'discountId'
});

Discount.belongsToMany(Product, {
    through: ProductDiscounts,
    foreignKey: 'discountId',
    otherKey: 'productId'
});

