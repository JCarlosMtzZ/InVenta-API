import { QueryTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const getOrdersMinDate = async () => {
    const dateRange = await sequelize.query(`
        SELECT
            MIN(DATE_TRUNC('month', "o"."date")) as startdate
        FROM "Orders" as "o"
        `, {
            type: QueryTypes.SELECT
    });
    return dateRange;
};

export const getOrdersMaxDate = async () => {
    const dateRange = await sequelize.query(`
        SELECT
            MAX(DATE_TRUNC('month', "o"."date")) as enddate
        FROM "Orders" as "o"
        `, {
            type: QueryTypes.SELECT
    });
    return dateRange;
};