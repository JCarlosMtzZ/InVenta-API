import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        dialect: 'postgres',
        dialectOptions: {
            ssl: process.env.DB_SSL === 'true' ? { require: true, rejectUnauthorized: false } : false
        },
    }
);
