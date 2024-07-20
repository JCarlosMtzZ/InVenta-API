import { sequelize } from "../config/db.js";
import { Admin } from "./Admin.js";
import { Discount } from "./Discount.js";
import { Image } from "./Image.js";
import { Order } from "./Order.js";
import { OrderItem } from "./OrderItem.js";
import { Product } from "./Product.js";
import { ProductDiscounts } from "./ProductDiscounts.js";

export const Sync = sequelize.sync({
     alter: true
})
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch((error) => {
        console.error('Error creating database & tables:', error);
    });